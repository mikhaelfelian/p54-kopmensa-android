import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

const PettyCashCategoryScreen: React.FC<any> = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with Add Button */}
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="list" size={18} color="#000" />
          <Text style={styles.headerTitle}> Daftar Kategori</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome name="plus" size={16} color="#fff" />
          <Text style={styles.addButtonText}> Tambah Kategori</Text>
        </TouchableOpacity>
      </View>

      {/* Table Section */}
      <View style={styles.tableCard}>
        {/* Table Row Header */}
        <View style={styles.tableRowHeader}>
          <Text style={[styles.tableHead, { flex: 0.2 }]}>No</Text>
          <Text style={styles.tableHead}>Kode</Text>
          <Text style={styles.tableHead}>Nama Kategori</Text>
          <Text style={styles.tableHead}>Deskripsi</Text>
          <Text style={styles.tableHead}>Status</Text>
          <Text style={styles.tableHead}>Aksi</Text>
        </View>

        {/* Example Data Row */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 0.2 }]}>1</Text>
          <View style={styles.badgeWrapper}>
            <Text style={[styles.badge, { backgroundColor: "#17a2b8" }]}>OPR</Text>
          </View>
          <Text style={styles.tableCell}>sasass</Text>
          <Text style={styles.tableCell}>sasasa</Text>
          <View style={styles.badgeWrapper}>
            <Text style={[styles.badge, { backgroundColor: "#28a745" }]}>Aktif</Text>
          </View>
          <View style={styles.actionGroup}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#007bff" }]}>
              <FontAwesome name="edit" size={14} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#ffc107" }]}>
              <FontAwesome name="ban" size={14} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#dc3545" }]}>
              <FontAwesome name="trash" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PettyCashCategoryScreen;
