import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { LineChart, PieChart } from "react-native-gifted-charts";
import Gap from "@/components/Gap";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { GetDashboardBasicMetrics, GetMonthlySales, GetPerformanceMetrics, GetRecentTransaction, GetSalesByCategory, GetTopProducts } from "@/app/services/sales";
import { SalesMonthlyTarget } from "@/app/models/sales-monthly-target";
import { formatCurrency } from "@/app/utils/currency";
import { formatPercent } from "@/app/utils/converter";
import { BasicMetricItem, BasicMetrics } from "@/app/models/basic-metric";
import { SalesByCategory } from "@/app/models/sales-by-category";
import { TopProduct } from "@/app/models/top-product";
import { RecentTransaction } from "@/app/models/recent-transaction";

interface SalesChartPoint {
  label: string;
  value: number;
}

const DashboardScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const [salesChartData, setSalesChartData] = useState<SalesChartPoint[]>([]);
  const [monthlySalesTargetData, setMonthlySalesTargetData] = useState<SalesMonthlyTarget>();
  const [salesByCategory, setSalesByCategory] = useState<SalesByCategory[]>();
  const [topProducts, setTopProducts] = useState<TopProduct[]>();
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>();
  const [recentPurchases, setRcentPurchases] = useState([]);

  const [summaryData, setSummaryData] = useState<BasicMetrics>();
  const [basicMetrics, setBasicMetrics] = useState<BasicMetricItem[]>([]);
  const statsMeta: Omit<BasicMetricItem, "value">[] = [
    { icon: "cart-shopping", color: colors.green, title: "Penjualan Lunas" },
    { icon: "money-bill", color: colors.blue1, title: "Total Pendapatan" },
    { icon: "bag-shopping", color: colors.red, title: "Pembelian Lunas" },
    { icon: "chart-line", color: colors.yellow, title: "Total Laba" },
  ];

  const pieData = [
    {
      value: 157500,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(setIsLoading(true));
      await Promise.all([getDashboardBasicMetrics(), getMonthlySales(), getPerformanceMetrics(), getSalesByCategory(), getTopProducts(), getRecentTransactions()]);
    } catch (error) {
      console.error("fetchData", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getDashboardBasicMetrics = async () => {
    try {
      const response = await GetDashboardBasicMetrics();
      const _metricData: BasicMetrics = response?.data ?? {
        total_sales_transactions: 0,
        total_revenue: 0,
        sales_growth_percentage: 0,
        total_purchase_transactions: 0,
        total_expenses: 0,
        total_profit: 0,
        total_stock: 0,
      };

      const updatedStats: BasicMetricItem[] = statsMeta.map((stat) => {
        let value = "";

        switch (stat.title) {
          case "Penjualan Lunas":
            value = String(_metricData.total_sales_transactions);
            break;
          case "Total Pendapatan":
            value = `Rp ${_metricData.total_revenue.toLocaleString("id-ID")}`;
            break;
          case "Pembelian Lunas":
            value = String(_metricData.total_purchase_transactions);
            break;
          case "Total Laba":
            value = `Rp ${_metricData.total_profit.toLocaleString("id-ID")}`;
            break;
          default:
            value = "0";
        }

        return { ...stat, value };
      });

      setBasicMetrics(updatedStats);
      setSummaryData(_metricData);
    } catch (error) {
      console.error("getDashboardBasicMetrics", error);
      setBasicMetrics(statsMeta.map((stat) => ({ ...stat, value: stat.title.includes("Rp") ? "Rp 0" : "0" })));
    }
  };

  const getMonthlySales = async () => {
    try {
      const response = await GetMonthlySales();
      const monthlyData = response?.data;

      if (Array.isArray(monthlyData)) {
        const chartData = monthlyData.map((item) => ({
          label: item.month.split(" ")[0],
          value: item.total_sales / 1000,
        }));

        setSalesChartData(chartData);
      }
    } catch (error) {
      console.error("getMonthlySales", error);
    }
  };

  const getPerformanceMetrics = async () => {
    try {
      const response = await GetPerformanceMetrics();
      setMonthlySalesTargetData(response?.data);
    } catch (error) {
      console.error("getPerformanceMetrics", error);
    }
  };

  const getSalesByCategory = async () => {
    try {
      const response = await GetSalesByCategory();
      const _data = response?.data?.map((item: any) => ({
        ...item,
        value: item?.total_sales,
      }));

      setSalesByCategory(_data);
    } catch (error) {
      console.error("getSalesByCategory", error);
    }
  };

  const getTopProducts = async () => {
    try {
      const response = await GetTopProducts();
      setTopProducts(response?.data);
    } catch (error) {
      console.error("getTopProducts", error);
    }
  };

  const getRecentTransactions = async () => {
    try {
      const response = await GetRecentTransaction();
      setRecentTransactions(response?.data?.recent_sales ?? []);
      setRcentPurchases(response?.data?.recent_purchases ?? []);
    } catch (error) {
      console.error("getTopProducts", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} onRefresh={fetchData} />}>
        {/* Top Stats */}
        <View style={styles.statsTopWrapper}>
          {basicMetrics.map((item, idx) => (
            <View key={idx} style={styles.statCard}>
              <View style={[styles.statIconWrapper, { backgroundColor: item.color }]}>
                <FontAwesome6 name={item.icon as any} size={20} color={colors.light} />
              </View>
              <View>
                <Text style={styles.statTitle}>{item.title}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Chart Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Laporan Penjualan 12 Bulan Terakhir</Text>
          <View style={{ height: 260, paddingVertical: 10 }}>
            <LineChart
              data={salesChartData}
              curved
              areaChart
              startFillColor="rgba(34,128,176,0.3)"
              endFillColor="rgba(34,128,176,0.05)"
              startOpacity={0.8}
              endOpacity={0.1}
              spacing={width / (salesChartData.length || 1)}
              color={colors.blue1}
              thickness={2}
              yAxisTextStyle={{ color: "grey", fontSize: 10 }}
              xAxisLabelTextStyle={{ color: "grey", fontSize: 10 }}
              yAxisLabelPrefix="Rp "
              yAxisLabelSuffix="k"
              noOfSections={6}
            />
          </View>

          <Text style={styles.subTitle}>Target Penjualan Bulan Ini</Text>
          <Text style={styles.textLine}>
            Target Bulanan:{" "}
            <Text style={styles.bold}>
              {formatCurrency(monthlySalesTargetData?.current_month_sales)} / {formatCurrency(monthlySalesTargetData?.monthly_target)}
            </Text>
          </Text>
          <Text style={styles.textLine}>
            Target Harian Hari Ini: {formatCurrency(monthlySalesTargetData?.today_sales)} / {formatCurrency(monthlySalesTargetData?.daily_target)}
          </Text>
          <Text style={styles.textLine}>Rata-rata Order: {formatCurrency(monthlySalesTargetData?.average_order_value)}</Text>
          <Text style={styles.textLine}>Pertumbuhan vs Bulan Lalu: {monthlySalesTargetData?.sales_growth_percentage?.toFixed(2) ?? "0.00"}%</Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryBox}>
            <Text style={monthlySalesTargetData?.sales_growth_percentage != null && monthlySalesTargetData.sales_growth_percentage > 0 ? styles.summaryUp : styles.summaryDown}>
              {monthlySalesTargetData?.sales_growth_percentage != null ? (monthlySalesTargetData.sales_growth_percentage > 0 ? "▲" : "▼") + " " + formatPercent(monthlySalesTargetData.sales_growth_percentage) : "-"}
            </Text>
            <Text style={styles.summaryValue}>{formatCurrency(summaryData?.total_revenue)}</Text>
            <Text style={styles.summaryLabel}>TOTAL PENDAPATAN</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryDown}>{summaryData?.total_expenses != null && summaryData.total_expenses > 0 ? "▲" : "▼"}</Text>
            <Text style={styles.summaryValue}>{formatCurrency(summaryData?.total_expenses)}</Text>
            <Text style={styles.summaryLabel}>TOTAL BIAYA</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryUp}>{summaryData?.total_profit != null && summaryData.total_profit > 0 ? "▲" : "▼"}</Text>
            <Text style={styles.summaryValue}>{formatCurrency(summaryData?.total_profit)}</Text>
            <Text style={styles.summaryLabel}>TOTAL LABA</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryUp}>{summaryData?.total_sales_transactions != null && summaryData.total_sales_transactions > 0 ? "▲" : "▼"}</Text>
            <Text style={styles.summaryValue}>{summaryData?.total_sales_transactions}</Text>
            <Text style={styles.summaryLabel}>TRANSAKSI LUNAS</Text>
          </View>
        </View>

        {/* Penjualan per Kategori */}
        <View style={styles.cardRow}>
          {/* Left Donut Chart */}
          <View style={styles.donutWrapper}>
            <Text style={styles.cardTitle}>Penjualan per Kategori</Text>
            <PieChart
              donut
              data={salesByCategory ?? []}
              radius={80}
              innerRadius={55}
              centerLabelComponent={() => <Text style={styles.donutCenter}>{(salesByCategory ?? []).reduce((max, item) => (item.total_sales > max.total_sales ? item : max)).category_name}</Text>}
            />
            {salesByCategory?.map((item, index) => (
              <Text style={styles.donutValue} key={index}>
                {formatCurrency(item?.total_sales)} {item?.category_name}
              </Text>
            ))}
          </View>

          {/* Right Cards */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={[styles.rightCard, { backgroundColor: colors.yellow }]}>
              <FontAwesome6 name={"tag"} size={18} color={colors.light} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.rightCardTitle}>Persediaan</Text>
                <Text style={styles.rightCardValue}>{summaryData?.total_stock}</Text>
              </View>
            </View>
            <View style={[styles.rightCard, { backgroundColor: colors.green }]}>
              <FontAwesome6 name={"heart"} size={18} color={colors.light} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.rightCardTitle}>Pelanggan Baru</Text>
                <Text style={styles.rightCardValue}>{monthlySalesTargetData?.new_customers_this_month}</Text>
              </View>
            </View>
            <View style={[styles.rightCard, { backgroundColor: colors.red }]}>
              <FontAwesome6 name={"cart-shopping"} size={18} color={colors.light} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.rightCardTitle}>Total Transaksi</Text>
                <Text style={styles.rightCardValue}>{summaryData?.total_sales_transactions}</Text>
              </View>
            </View>
            <View style={[styles.rightCard, { backgroundColor: colors.gray4 }]}>
              <FontAwesome6 name={"user"} size={18} color={colors.light} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.rightCardTitle}>Total Pelanggan</Text>
                <Text style={styles.rightCardValue}>{monthlySalesTargetData?.total_customers}</Text>
              </View>
            </View>
          </View>
        </View>

        <Gap height={15} />

        {/* Produk Terlaris */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Produk Terlaris</Text>
            <Gap width={10} />
            <Text style={styles.badgeGreen}>{topProducts?.length} Produk Teratas</Text>
          </View>

          {/* Table Header */}
          <View style={styles.tableRowHeader}>
            <Text style={[styles.tableHeader, { flex: 3 }]}>Produk</Text>
            <Text style={[styles.tableHeader, { flex: 1, textAlign: "center" }]}>Terjual</Text>
            <Text style={[styles.tableHeader, { flex: 1, textAlign: "center" }]}>Transaksi</Text>
            <Text style={[styles.tableHeader, { flex: 2, textAlign: "right" }]}>Total Penjualan</Text>
          </View>

          {/* Table Rows */}
          {topProducts?.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>{item.product_name}</Text>
              <Text style={[styles.tableCellGreen, { flex: 1, textAlign: "center" }]}>{item.total_quantity}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: "center" }]}>{item.transaction_count}</Text>
              <Text style={[styles.tableCell, { flex: 2, textAlign: "right" }]}>{formatCurrency(item.total_sales)}</Text>
            </View>
          ))}

          <TouchableOpacity onPress={() => navigation.navigate("CashierScreen")}>
            <Text style={styles.linkText}>Lihat Semua Produk</Text>
          </TouchableOpacity>
        </View>

        {/* Transaksi Lunas Terbaru */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Transaksi Lunas Terbaru</Text>
            <Gap width={10} />
            <Text style={styles.badgeGreen}>{recentTransactions?.length} Penjualan</Text>
            <Gap width={10} />
            <Text style={styles.badgeRed}>{recentPurchases?.length} Pembelian</Text>
          </View>

          {/* Table Header */}
          <View style={styles.tableRowHeader}>
            <Text style={[styles.tableHeader, { flex: 1 }]}>Tipe</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>No. Nota</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>Tanggal</Text>
            <Text style={[styles.tableHeader, { flex: 1.5, textAlign: "left" }]}>Total</Text>
            <Text style={[styles.tableHeader, { flex: 1, textAlign: "center" }]}>Status</Text>
          </View>

          {/* Table Rows */}
          {recentTransactions?.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={styles.badgeGreen}>Penjualan</Text>
              </View>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.no_nota}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.tgl_masuk}</Text>
              <Text style={[styles.tableCell, { flex: 1.5, textAlign: "left", fontWeight: "600" }]}>{formatCurrency(item.jml_bayar)}</Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.badgeGreen}>{item.status === "1" ? "Lunas" : "Belum Lunas"}</Text>
              </View>
            </View>
          ))}

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.green }]}>
              <Text style={styles.btnText}>Kasir Baru</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.red }]}>
              <Text style={styles.btnText}>Pembelian Baru</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.gray4, alignSelf: "flex-end" }]} onPress={() => navigation.navigate("DataSalesCashierScreen")}>
            <Text style={styles.btnText}>Lihat Semua Transaksi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
