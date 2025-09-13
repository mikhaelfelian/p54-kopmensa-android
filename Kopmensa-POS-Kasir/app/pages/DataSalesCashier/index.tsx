import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, RefreshControl } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import styles from "./styles";
import { TransactionItem } from "@/app/models/transaction";
import { GetTransaction } from "@/app/services/inventory";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { dateParser } from "@/app/utils/dates";
import { formatCurrency } from "@/app/utils/currency";
import { GetPaymentMethods } from "@/app/services/sales";
import { Payment } from "@/app/models/payment";
import TransDetailModal from "@/components/TransDetailModal";

const DataSalesCashierScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isTransDetailVisible, setIsTransDetailVisible] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionItem>();
  const [transactionList, setTransactionList] = useState<TransactionItem[]>([]);
  const [salesTodayCount, setSalesTodayCount] = useState(0);
  const [todayTransactionCount, setTodayTransactionCount] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [paymentPlatformCount, setPaymentPlatformCount] = useState(0);
  const [keywords, setKeywords] = useState("");
  const filteredTransaction = keywords?.length > 0 ? transactionList?.filter((x) => x?.no_nota?.toLowerCase()?.includes(keywords?.toLowerCase())) : transactionList;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(setIsLoading(true));
      await Promise.all([getTransaction(), getPayments()]);
    } catch (error) {
      console.error("fetchData", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getTransaction = async () => {
    try {
      await GetTransaction().then((response) => {
        const _transactions = response?.transactions;
        setTransactionList(_transactions);
        setSalesTodayCount(_transactions?.filter((x: TransactionItem) => x?.status === "1" && dateParser(x?.created_at, "DD/MM/YYYY") === dateParser(new Date(), "DD/MM/YYYY"))?.length);
        setTodayTransactionCount(_transactions?.filter((x: TransactionItem) => dateParser(x?.created_at, "DD/MM/YYYY") === dateParser(new Date(), "DD/MM/YYYY"))?.length);
        setTotalCustomer(new Set(_transactions.filter((x: TransactionItem) => x.id_pelanggan).map((x: TransactionItem) => x.id_pelanggan)).size);
      });
    } catch (error) {
      console.error("getTransaction", error);
    }
  };

  const getPayments = async () => {
    try {
      await GetPaymentMethods().then((response) => {
        let _items = response?.payment_methods;
        _items = _items?.filter((x: Payment) => x?.type === "platform");
        setPaymentPlatformCount(_items?.length);
      });
    } catch (error) {
      console.log("getPayments : " + error);
    }
  };

  const renderItem = ({ item, index }: { item: TransactionItem; index: number }) => (
    <View style={styles.tableRow}>
      <View style={styles.colNo}>
        <Text>{index + 1}</Text>
      </View>
      <View style={styles.colNota}>
        <Text style={styles.boldText}>{item.no_nota}</Text>
        <Text style={styles.subText}>{dateParser(item.created_at, "DD/MM/YYYY HH:mm")}</Text>
        <Text style={styles.subText}>{!!item?.id_pelanggan ? "Anggota" : "Umum"}</Text>
      </View>
      <View style={styles.colPelanggan}>
        <Text>{!!item?.id_pelanggan ? "Anggota" : "Umum"}</Text>
      </View>
      <View style={styles.colTotal}>
        <Text>{formatCurrency(item.jml_total)}</Text>
      </View>
      <View style={styles.colStatus}>
        <View style={styles.badgeWrapper}>
          <Text style={[styles.badge, { backgroundColor: "#28a745" }]}>{item.status === "1" ? "Selesai" : "Belum Selesai"}</Text>
        </View>
      </View>
      <View style={styles.colStatusBayar}>
        <View style={styles.badgeWrapper}>
          <Text style={[styles.badge, { backgroundColor: "#28a745" }]}>{item.status_bayar === "1" ? "Selesai" : "Belum Selesai"}</Text>
        </View>
      </View>
      <View style={styles.colAksi}>
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#17a2b8" }]}
            onPress={() => {
              setTransactionData(item);
              setIsTransDetailVisible(true);
            }}
          >
            <FontAwesome name="eye" size={14} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#28a745" }]}>
            <FontAwesome name="print" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: "#17a2b8" }]}>
          <Text style={styles.summaryNumber}>{salesTodayCount}</Text>
          <Text style={styles.summaryLabel}>Total Penjualan Hari Ini</Text>
          <FontAwesome name="shopping-cart" size={28} color="#fff" />
        </View>
        <View style={[styles.summaryCard, { backgroundColor: "#28a745" }]}>
          <Text style={styles.summaryNumber}>{todayTransactionCount}</Text>
          <Text style={styles.summaryLabel}>Transaksi Hari Ini</Text>
          <FontAwesome name="line-chart" size={28} color="#fff" />
        </View>
        <View style={[styles.summaryCard, { backgroundColor: "#ffc107" }]}>
          <Text style={styles.summaryNumber}>{totalCustomer}</Text>
          <Text style={styles.summaryLabel}>Total Pelanggan</Text>
          <FontAwesome name="users" size={28} color="#fff" />
        </View>
        <View style={[styles.summaryCard, { backgroundColor: "#dc3545" }]}>
          <Text style={styles.summaryNumber}>{paymentPlatformCount}</Text>
          <Text style={styles.summaryLabel}>Platform Pembayaran</Text>
          <FontAwesome name="credit-card" size={28} color="#fff" />
        </View>
      </View>

      {/* Main Content and Sidebar */}
      <View style={styles.mainRow}>
        {/* Left Side */}
        <View style={styles.leftContent}>
          {/* Search + Filter + Button */}
          <View style={styles.searchRow}>
            <TextInput placeholder="Cari nota..." style={styles.searchInput} onChangeText={(text) => setKeywords(text)} />
          </View>

          {/* Table */}
          <View style={styles.tableCard}>
            {/* Header */}
            <View style={styles.tableRowHeader}>
              <View style={styles.colNo}>
                <Text style={styles.tableHead}>No</Text>
              </View>
              <View style={styles.colNota}>
                <Text style={styles.tableHead}>No. Nota</Text>
              </View>
              <View style={styles.colPelanggan}>
                <Text style={styles.tableHead}>Pelanggan</Text>
              </View>
              <View style={styles.colTotal}>
                <Text style={styles.tableHead}>Total</Text>
              </View>
              <View style={styles.colStatus}>
                <Text style={styles.tableHead}>Status</Text>
              </View>
              <View style={styles.colStatusBayar}>
                <Text style={styles.tableHead}>Status Bayar</Text>
              </View>
              <View style={styles.colAksi}>
                <Text style={styles.tableHead}>Aksi</Text>
              </View>
            </View>

            <FlatList
              data={filteredTransaction}
              renderItem={renderItem}
              keyExtractor={(item: TransactionItem, index: { toString: () => any }) => index.toString()}
              refreshControl={<RefreshControl refreshing={false} onRefresh={fetchData} />}
            />
          </View>
        </View>

        {/* Right Side Sidebar */}
        <View style={styles.sidebar}>
          {/* Aksi Cepat */}
          <View style={styles.quickActions}>
            <Text style={styles.quickTitle}>⚡ Aksi Cepat</Text>
            <TouchableOpacity style={[styles.quickBtn, { backgroundColor: "#28a745" }]} onPress={() => navigation.navigate("CashierScreen")}>
              <FontAwesome name="money" size={16} color="#fff" />
              <Text style={styles.quickText}> Buka Kasir</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.quickBtn, { backgroundColor: "#17a2b8" }]}>
              <FontAwesome name="bar-chart" size={16} color="#fff" />
              <Text style={styles.quickText}> Laporan</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={[styles.quickBtn, { backgroundColor: "#ffc107" }]} onPress={() => navigation.navigate("ReturnFundsScreen")}>
              <FontAwesome name="undo" size={16} color="#fff" />
              <Text style={styles.quickText}> Retur</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <TransDetailModal visible={isTransDetailVisible} onClose={() => setIsTransDetailVisible(false)} transaction={transactionData} />
    </View>
  );
};

export default DataSalesCashierScreen;
