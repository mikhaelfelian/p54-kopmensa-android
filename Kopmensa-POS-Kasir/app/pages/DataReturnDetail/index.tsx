import React, { useEffect } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

const DataReturnDetailScreen: React.FC<any> = ({ route }) => {
  const params = route?.params;

  useEffect(() => {
    console.log("Detail Params:", params);
  }, []);

  const renderHeaderRow = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, { flex: 0.5 }]}>No</Text>
      <Text style={[styles.headerText, { flex: 1.5 }]}>Kode</Text>
      <Text style={[styles.headerText, { flex: 2 }]}>Produk</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Qty</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Satuan</Text>
      <Text style={[styles.headerText, { flex: 1.2 }]}>Harga</Text>
      <Text style={[styles.headerText, { flex: 1.2 }]}>Subtotal</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Tipe</Text>
    </View>
  );

  const renderItem = ({ item, index }: any) => (
    <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? "#fff" : "#F3F3F3" }]}>
      <Text style={[styles.cellText, { flex: 0.5 }]}>{index + 1}</Text>
      <Text style={[styles.cellText, { flex: 1.5 }]}>{item.kode}</Text>
      <Text style={[styles.cellTextBold, { flex: 2 }]}>{item.item}</Text>
      <Text style={[styles.cellText, { flex: 1 }]}>{item.jml}</Text>
      <Text style={[styles.cellText, { flex: 1 }]}>{item.satuan}</Text>
      <Text style={[styles.cellText, { flex: 1.2 }]}>Rp {item.harga.toLocaleString("id-ID")}</Text>
      <Text style={[styles.cellText, { flex: 1.2 }]}>Rp {item.subtotal.toLocaleString("id-ID")}</Text>
      <View style={[styles.badgeSmall, { flex: 1 }]}>
        <Text style={styles.badgeSmallText}>Retur</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Info Section */}
      <View style={styles.infoWrapper}>
        <View style={styles.infoRow}>
          {/* Left column */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>No. Retur</Text>
            <Text style={styles.infoValue}>{params.no_retur}</Text>
          </View>

          {/* Right column */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Tipe Retur</Text>
            <View style={styles.badgeRefund}>
              <FontAwesome name="money" size={12} color="#fff" />
              <Text style={styles.badgeRefundText}> Refund</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Tanggal Retur</Text>
            <Text style={styles.infoValue}>{params.tgl_masuk}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.badgeStatus}>
              <Text style={styles.badgeStatusText}>Selesai</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>No. Penjualan</Text>
            <Text style={styles.infoValue}>{params.no_nota}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>User</Text>
            <Text style={styles.infoValue}>Superadmin Admin</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Pelanggan</Text>
            <Text style={styles.infoValue}>{params.customer_nama}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Dibuat</Text>
            <Text style={styles.infoValue}>{params.created_at}</Text>
          </View>
        </View>
      </View>

      {/* Detail Item Retur Section */}
      <View style={styles.detailCard}>
        <View style={styles.detailHeader}>
          <FontAwesome name="list" size={16} color="#333" />
          <Text style={styles.detailHeaderText}> Detail Item Retur</Text>
        </View>

        <View style={styles.tableWrapper}>
          {renderHeaderRow()}
          <FlatList data={params.details} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
        </View>
      </View>
    </ScrollView>
  );
};

export default DataReturnDetailScreen;
