import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import Gap from "@/components/Gap";
import { ShiftDetail } from "@/app/models/shift";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { GetShiftDetail } from "@/app/services/shift";
import { dateParser } from "@/app/utils/dates";
import { formatCurrency } from "@/app/utils/currency";

const DetailShiftScreen: React.FC<any> = ({ navigation, route }) => {
  const params = route?.params;
  const dispatch = useDispatch();
  const [shiftDetail, setShiftDetail] = useState<ShiftDetail>();

  useEffect(() => {
    getShiftDetail();
  }, []);

  const getShiftDetail = async () => {
    try {
      dispatch(setIsLoading(true));

      await GetShiftDetail(params?.id).then((response) => {
        setShiftDetail(response?.shift !== null ? response : null);
      });
    } catch (error) {
      console.error("getShiftDetail", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Informasi Shift + Aksi */}
      <View style={styles.row}>
        {/* Informasi Shift */}
        <View style={styles.cardLeft}>
          <View style={styles.cardHeader}>
            <FontAwesome name="clock-o" size={16} color="#333" />
            <Text style={styles.cardTitle}> Informasi Shift</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kasir:</Text>
            <Text style={styles.infoValue}>{shiftDetail?.shift?.user_open_name}</Text>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.badge, { backgroundColor: "#FDD405", color: "#000" }]}>{shiftDetail?.shift?.status ? shiftDetail.shift.status.charAt(0).toUpperCase() + shiftDetail.shift.status.slice(1) : ""}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Outlet:</Text>
            <Text style={styles.infoValue}>{shiftDetail?.shift?.outlet_name}</Text>
            <Text style={styles.infoLabel}>Jam Tutup:</Text>
            <Text style={styles.infoValue}>{shiftDetail?.shift?.end_at != null ? dateParser(shiftDetail?.shift?.end_at, "HH:mm:ss") : ""}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tanggal:</Text>
            <Text style={styles.infoValue}>{shiftDetail?.shift?.start_at != null ? dateParser(shiftDetail?.shift?.start_at, "DD/MM/YYYY") : ""}</Text>
            <Text style={styles.infoLabel}>Saldo Awal:</Text>
            <Text style={styles.infoValue}>{formatCurrency(shiftDetail?.shift?.open_float)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Jam Buka:</Text>
            <Text style={styles.infoValue}>{shiftDetail?.shift?.start_at != null ? dateParser(shiftDetail?.shift?.start_at, "HH:mm:ss") : ""}</Text>
            <Text style={styles.infoLabel}>Saldo Akhir:</Text>
            <Text style={styles.infoValue}>{shiftDetail?.shift?.counted_cash != null ? formatCurrency(shiftDetail?.shift?.counted_cash) : 0}</Text>
          </View>
        </View>

        {/* Aksi */}
        <View style={styles.cardRight}>
          <Text style={styles.cardTitle}>⚙️ Aksi</Text>
          <Gap height={14} />
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#17a2b8" }]}>
            <FontAwesome name="print" size={16} color="#fff" />
            <Text style={styles.actionText}> Cetak Laporan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ringkasan Transaksi + Statistik Cepat */}
      <View style={styles.row}>
        <View style={styles.cardLeft}>
          <View style={styles.cardHeader}>
            <FontAwesome name="bar-chart" size={16} color="#333" />
            <Text style={styles.cardTitle}> Ringkasan Transaksi</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, { borderColor: "#17a2b8" }]}>
              <FontAwesome name="shopping-cart" size={22} color="#17a2b8" />
              <Text style={styles.summaryLabel}>Total Transaksi</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
            <View style={[styles.summaryCard, { borderColor: "#28a745" }]}>
              <FontAwesome name="money" size={22} color="#28a745" />
              <Text style={styles.summaryLabel}>Total Penjualan</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
            <View style={[styles.summaryCard, { borderColor: "#ffc107" }]}>
              <FontAwesome name="credit-card" size={22} color="#ffc107" />
              <Text style={styles.summaryLabel}>Total Pembayaran</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
            <View style={[styles.summaryCard, { borderColor: "#dc3545" }]}>
              <FontAwesome name="exchange" size={22} color="#dc3545" />
              <Text style={styles.summaryLabel}>Selisih</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text style={styles.cardTitle}>📊 Statistik Cepat</Text>
          <Gap height={14} />
          <View style={styles.statsRow}>
            <View style={styles.statsCol}>
              <Text style={[styles.statsValue, { color: "#28a745" }]}>0</Text>
              <Text style={styles.statsLabel}>Tunai</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={[styles.statsValue, { color: "#007bff" }]}>0</Text>
              <Text style={styles.statsLabel}>Kartu</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={[styles.statsValue, { color: "#ffc107" }]}>0</Text>
              <Text style={styles.statsLabel}>QRIS</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={[styles.statsValue, { color: "#dc3545" }]}>0</Text>
              <Text style={styles.statsLabel}>Lainnya</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Transaksi Terbaru */}
      <View style={styles.cardFull}>
        <View style={styles.cardHeader}>
          <FontAwesome name="list" size={16} color="#333" />
          <Text style={styles.cardTitle}> Transaksi Terbaru</Text>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>Lihat Semua Transaksi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHead, { flex: 0.5 }]}>No</Text>
          <Text style={[styles.tableHead, { flex: 1 }]}>Waktu</Text>
          <Text style={[styles.tableHead, { flex: 2 }]}>No Transaksi</Text>
          <Text style={[styles.tableHead, { flex: 1 }]}>Total</Text>
          <Text style={[styles.tableHead, { flex: 2 }]}>Metode Pembayaran</Text>
          <Text style={[styles.tableHead, { flex: 1 }]}>Status</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.emptyText}>Tidak ada transaksi untuk shift ini</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailShiftScreen;
