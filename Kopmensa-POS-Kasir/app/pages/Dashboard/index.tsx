import React from "react";
import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { LineChart, PieChart } from "react-native-gifted-charts";
import Gap from "@/components/Gap";

const DashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");

  const statsTop = [
    { icon: "cart-shopping", color: colors.green, title: "Penjualan Lunas", value: "5" },
    { icon: "money-bill", color: colors.blue1, title: "Total Pendapatan", value: "Rp 157.500" },
    { icon: "bag-shopping", color: colors.red, title: "Pembelian Lunas", value: "0" },
    { icon: "chart-line", color: colors.yellow, title: "Total Laba", value: "Rp 157.500" },
  ];

  const salesData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50000, 157500];
  const months: string[] = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const pieData = [
    {
      value: 157500,
      color: colors.red,
      text: "157.500",
    },
  ];

  const summaryRight = [
    { icon: "tag", color: colors.yellow, title: "Persediaan", value: "7.038" },
    { icon: "heart", color: colors.green, title: "Pelanggan Baru", value: "5" },
    { icon: "cart-shopping", color: colors.red, title: "Total Transaksi", value: "5" },
    { icon: "user", color: colors.gray4, title: "Total Pelanggan", value: "5" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Stats */}
        <View style={styles.statsTopWrapper}>
          {statsTop.map((item, idx) => (
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
              data={salesData.map((value, i) => ({ value, label: months[i] }))}
              curved
              areaChart
              startFillColor="rgba(34,128,176,0.3)"
              endFillColor="rgba(34,128,176,0.05)"
              startOpacity={0.8}
              endOpacity={0.1}
              spacing={width / salesData.length}
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
            Target Bulanan: <Text style={styles.bold}>Rp 157.500 / Rp 50.000.000</Text>
          </Text>
          <Text style={styles.textLine}>Target Harian Hari Ini: Rp 0 / Rp 1.612.903</Text>
          <Text style={styles.textLine}>Rata-rata Order: Rp 31.500</Text>
          <Text style={styles.textLine}>Pertumbuhan vs Bulan Lalu: 0.0%</Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryUp}>▲ 0.0%</Text>
            <Text style={styles.summaryValue}>Rp 157.500</Text>
            <Text style={styles.summaryLabel}>TOTAL PENDAPATAN</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryDown}>▼ 0.0%</Text>
            <Text style={styles.summaryValue}>Rp 0</Text>
            <Text style={styles.summaryLabel}>TOTAL BIAYA</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryUp}>▲ 100.0%</Text>
            <Text style={styles.summaryValue}>Rp 157.500</Text>
            <Text style={styles.summaryLabel}>TOTAL LABA</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryUp}>▲ 0.3%</Text>
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>TRANSAKSI LUNAS</Text>
          </View>
        </View>

        {/* Penjualan per Kategori */}
        <View style={styles.cardRow}>
          {/* Left Donut Chart */}
          <View style={styles.donutWrapper}>
            <Text style={styles.cardTitle}>Penjualan per Kategori</Text>
            <PieChart donut data={pieData} radius={80} innerRadius={55} centerLabelComponent={() => <Text style={styles.donutCenter}>Tanpa Kategori</Text>} />
            <Text style={styles.donutValue}>157.500 TANPA KATEGORI</Text>
          </View>

          {/* Right Cards */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            {summaryRight.map((item, idx) => (
              <View key={idx} style={[styles.rightCard, { backgroundColor: item.color }]}>
                <FontAwesome6 name={item.icon as any} size={18} color={colors.light} />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.rightCardTitle}>{item.title}</Text>
                  <Text style={styles.rightCardValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Gap height={15} />

        {/* Produk Terlaris */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Produk Terlaris</Text>
            <Gap width={10} />
            <Text style={styles.badgeGreen}>5 Produk Teratas</Text>
          </View>

          {/* Table Header */}
          <View style={styles.tableRowHeader}>
            <Text style={[styles.tableHeader, { flex: 3 }]}>Produk</Text>
            <Text style={[styles.tableHeader, { flex: 1, textAlign: "center" }]}>Terjual</Text>
            <Text style={[styles.tableHeader, { flex: 1, textAlign: "center" }]}>Transaksi</Text>
            <Text style={[styles.tableHeader, { flex: 2, textAlign: "right" }]}>Total Penjualan</Text>
          </View>

          {/* Table Rows */}
          {[
            { name: "ABC ALKALINE A2 - 8886022971289", terjual: 7, transaksi: 3, total: "Rp 70.000" },
            { name: "DILAN CHOCO SANDWICH 80G", terjual: 4, transaksi: 1, total: "Rp 26.000" },
            { name: "ABC ALKALINE AAA - 8886022941512", terjual: 1, transaksi: 1, total: "Rp 19.500" },
            { name: "ABC CHOCOMALT BOTOL - 8991002122000", terjual: 1, transaksi: 1, total: "Rp 4.000" },
            { name: "SANDWICH", terjual: 1, transaksi: 1, total: "Rp 7.000" },
          ].map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>{item.name}</Text>
              <Text style={[styles.tableCellGreen, { flex: 1, textAlign: "center" }]}>{item.terjual}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: "center" }]}>{item.transaksi}</Text>
              <Text style={[styles.tableCell, { flex: 2, textAlign: "right" }]}>{item.total}</Text>
            </View>
          ))}

          <TouchableOpacity>
            <Text style={styles.linkText}>Lihat Semua Produk</Text>
          </TouchableOpacity>
        </View>

        {/* Transaksi Lunas Terbaru */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Transaksi Lunas Terbaru</Text>
            <Gap width={10} />
            <Text style={styles.badgeGreen}>5 Penjualan</Text>
            <Gap width={10} />
            <Text style={styles.badgeRed}>0 Pembelian</Text>
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
          {[
            { tipe: "Penjualan", nota: "625082217480001", tanggal: "22/08/2025 00:00", total: "Rp 30.000", status: "Lunas" },
            { tipe: "Penjualan", nota: "625081909200001", tanggal: "19/08/2025 00:00", total: "Rp 43.500", status: "Lunas" },
            { tipe: "Penjualan", nota: "625081822460001", tanggal: "18/08/2025 00:00", total: "Rp 30.000", status: "Lunas" },
            { tipe: "Penjualan", nota: "625081822410001", tanggal: "18/08/2025 00:00", total: "Rp 34.500", status: "Lunas" },
            { tipe: "Penjualan", nota: "625081821460001", tanggal: "18/08/2025 00:00", total: "Rp 19.500", status: "Lunas" },
          ].map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={styles.badgeGreen}>{item.tipe}</Text>
              </View>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.nota}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.tanggal}</Text>
              <Text style={[styles.tableCell, { flex: 1.5, textAlign: "left", fontWeight: "600" }]}>{item.total}</Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.badgeGreen}>{item.status}</Text>
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

          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.gray4, alignSelf: "flex-end" }]}>
            <Text style={styles.btnText}>Lihat Semua Transaksi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
