import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import LoadingScreen from "@/components/LoadingScreen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ReturnItem } from "@/app/models/return";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { GetReturnSales } from "@/app/services/sales";

const DataReturnScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [returnSalesList, setReturnSalesList] = useState<ReturnItem[]>([]);

  useEffect(() => {
    getReturnSales();
  }, []);

  const getReturnSales = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await GetReturnSales();
      setReturnSalesList(response?.returns || []);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, { flex: 0.5 }]}>No</Text>
      <Text style={[styles.headerText, { flex: 2 }]}>No. Retur</Text>
      <Text style={[styles.headerText, { flex: 1.5 }]}>Tgl Retur</Text>
      <Text style={[styles.headerText, { flex: 2 }]}>Pelanggan</Text>
      <Text style={[styles.headerText, { flex: 2 }]}>No. Penjualan</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Tipe</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Total</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Status</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>User</Text>
      <Text style={[styles.headerText, { flex: 0.8 }]}>Aksi</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: ReturnItem; index: number }) => {
    const total = item.details.reduce((sum, d) => sum + d.subtotal, 0);

    return (
      <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2" }]}>
        <Text style={[styles.cellText, { flex: 0.5 }]}>{index + 1}</Text>
        <Text style={[styles.cellText, { flex: 2 }]}>{item.no_retur}</Text>
        <Text style={[styles.cellText, { flex: 1.5 }]}>{item.tgl_masuk}</Text>
        <Text style={[styles.cellText, { flex: 2 }]}>{item.customer_nama}</Text>
        <Text style={[styles.cellText, { flex: 2 }]}>{item.no_nota}</Text>

        {/* Refund badge */}
        <View style={[styles.badge, { backgroundColor: "#e6f7ff" }]}>
          <FontAwesome name="money" size={14} color="#00aaff" />
          <Text style={styles.badgeText}> Refund</Text>
        </View>

        {/* Total */}
        <Text style={[styles.cellText, { flex: 1 }]}>Rp {total.toLocaleString("id-ID")}</Text>

        {/* Status */}
        <View style={[styles.badge, { backgroundColor: "#d4f8d4" }]}>
          <Text style={[styles.badgeText, { color: "green" }]}>Selesai</Text>
        </View>

        {/* User */}
        <Text style={[styles.cellText, { flex: 1 }]}>{item.id_user ? "Superadmin" : "-"}</Text>

        {/* Action */}
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("DataReturnDetailScreen", item)}>
          <MaterialIcons name="visibility" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Tambah Retur</Text>
      </TouchableOpacity> */}
      <FlatList data={returnSalesList} keyExtractor={(item) => item.id.toString()} ListHeaderComponent={renderHeader} renderItem={renderItem} stickyHeaderIndices={[0]} />
    </View>
  );
};

export default DataReturnScreen;
