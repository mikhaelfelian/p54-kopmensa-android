import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import styles from "./styles";
import labelStyles from "@/constants/label-styles";
import { colors } from "@/constants/constants";
import Gap from "@/components/Gap";

const mockData = [
  {
    no: 1,
    smallUnit: "PCS",
    bigUnit: "BOX",
    total: 12,
    status: "Aktif",
  },
  {
    no: 2,
    smallUnit: "PCS",
    bigUnit: "BOX",
    total: 16,
    status: "Aktif",
  },
];

const UnitScreen: React.FC<any> = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua Status");
  const [perPage, setPerPage] = useState("10");

  const renderRow = ({ item }: any) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { flex: 0.5 }]}>{item.no}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.smallUnit}</Text>
      <Text style={[styles.cell, { flex: 1.2 }]}>{item.bigUnit}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.total}</Text>
      <View style={[styles.cell, { flex: 1 }]}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <View style={[styles.cell, { flex: 1, flexDirection: "row" }]}>
        <TouchableOpacity style={styles.editBtn}>
          <MaterialIcons name="edit" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <MaterialIcons name="delete" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Tambah Data */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Tambah Data</Text>
      </TouchableOpacity>

      {/* Filter Box */}
      <View style={styles.filterBox}>
        <Text style={styles.filterTitle}>Filter Data</Text>

        {/* Row 1 */}
        <View style={styles.filterRow}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={18} color="#999" />
            <Gap width={14} />
            <TextInput style={[labelStyles.normalGray4Label500, styles.centerVerticalText, { flex: 1 }]} placeholder="Cari..." value={search} onChangeText={setSearch} />
          </View>

          {/* Filter Button */}
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 0.5 }]}>No</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Satuan Kecil</Text>
        <Text style={[styles.headerCell, { flex: 1.2 }]}>Satuan Besar</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Jumlah</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Aksi</Text>
      </View>

      {/* Table Rows */}
      <FlatList data={mockData} renderItem={renderRow} keyExtractor={(item) => item.no.toString()} />
    </ScrollView>
  );
};

export default UnitScreen;
