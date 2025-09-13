import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { TransactionItem, TransactionDetailItem } from "@/app/models/transaction";
import labelStyles from "@/constants/label-styles";
import { dateParser } from "@/app/utils/dates";
import { formatCurrency } from "@/app/utils/currency";

interface Props {
  visible: boolean;
  onClose: () => void;
  transaction?: TransactionItem;
}

const TransDetailModal: React.FC<Props> = ({ visible, onClose, transaction }) => {
  if (!transaction) return null;

  const renderItem = ({ item, index }: { item: TransactionDetailItem; index: number }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
      <Text style={[styles.tableCell, { flex: 2 }]}>{item.produk}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>
        {item.jml} {item.satuan}
      </Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(item.harga)}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(item.subtotal)}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="visibility" size={20} color={styles.icon.color} />
              <Text style={styles.headerTitle}> Detail Transaksi </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={22} color={styles.icon.color} />
            </TouchableOpacity>
          </View>

          {/* Transaction Info */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>
                  No. Nota: <Text style={styles.bold}>{transaction.no_nota}</Text>
                </Text>
                <Text style={styles.infoLabel}>Tanggal: {dateParser(transaction.created_at, "DD/MM/YYYY HH:mm")}</Text>
                <Text style={styles.infoLabel}>
                  Status: <Text style={labelStyles.normalDarkLabel700}>Selesai</Text>
                </Text>
                <Text style={styles.infoLabel}>
                  Status Bayar: <Text style={labelStyles.normalDarkLabel700}>Lunas</Text>
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Subtotal: {formatCurrency(transaction.jml_subtotal)}</Text>
                <Text style={styles.infoLabel}>Diskon: {formatCurrency(transaction.jml_diskon)}</Text>
                <Text style={styles.infoLabel}>PPN: {formatCurrency(transaction.jml_ppn)}</Text>
                <Text style={styles.infoLabelBold}>Grand Total: {formatCurrency(transaction.jml_gtotal)}</Text>
              </View>
            </View>
          </View>

          {/* Items */}
          <Text style={styles.sectionTitle}>Detail Item</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>No</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Produk</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Harga</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Subtotal</Text>
          </View>
          <FlatList data={transaction.details} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />

          {/* Payment */}
          <Text style={styles.sectionTitle}>Platform Pembayaran</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Platform</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Nominal</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Keterangan</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{transaction.metode_bayar}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(transaction.jml_gtotal)}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TransDetailModal;
