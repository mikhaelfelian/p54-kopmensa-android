import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import styles from "./styles";

const PettyCashScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#007bff" }]}>
          <FontAwesome name="plus" size={16} color="#fff" />
          <Text style={styles.buttonText}> Input Kas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#17a2b8" }]} onPress={() => navigation.navigate("PettyCashCategoryScreen")}>
          <FontAwesome name="tag" size={16} color="#fff" />
          <Text style={styles.buttonText}> Kategori</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#28a745" }]}>
          <FontAwesome name="bar-chart" size={16} color="#fff" />
          <Text style={styles.buttonText}> Ringkasan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#ffc107" }]}>
          <FontAwesome name="download" size={16} color="#fff" />
          <Text style={styles.buttonText}> Export</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View style={styles.filterCard}>
        <View style={styles.filterHeader}>
          <FontAwesome name="filter" size={16} color="#000" />
          <Text style={styles.filterTitle}> Filter</Text>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.label}>Outlet</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text>Pojok Seduh</Text>
              <Entypo name="chevron-down" size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.label}>Status</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text>Semua Status</Text>
              <Entypo name="chevron-down" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.label}>Jenis</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text>Semua Jenis</Text>
              <Entypo name="chevron-down" size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.label}>Dari Tanggal</Text>
            <TextInput placeholder="dd-mm-yyyy" style={styles.input} />
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.label}>Sampai Tanggal</Text>
            <TextInput placeholder="dd-mm-yyyy" style={styles.input} />
          </View>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome name="search" size={16} color="#fff" />
          <Text style={styles.filterButtonText}> Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Table Section */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <FontAwesome name="list" size={16} color="#000" />
          <Text style={styles.tableTitle}> Daftar Petty Cash</Text>
        </View>

        {/* Table Row Header */}
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableHead}>No</Text>
          <Text style={styles.tableHead}>Tanggal</Text>
          <Text style={styles.tableHead}>Outlet</Text>
          <Text style={styles.tableHead}>Kategori</Text>
          <Text style={styles.tableHead}>Jenis</Text>
          <Text style={styles.tableHead}>Nominal</Text>
          <Text style={styles.tableHead}>Keterangan</Text>
          <Text style={styles.tableHead}>Status</Text>
          <Text style={styles.tableHead}>User</Text>
          <Text style={styles.tableHead}>Aksi</Text>
        </View>

        {/* Example Data Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>30/08/2025</Text>
          <Text style={styles.tableCell}>Pojok Seduh</Text>
          <Text style={styles.tableCell}>sasass</Text>
          <Text style={[styles.badge, { backgroundColor: "#28a745" }]}>Masuk</Text>
          <Text style={styles.tableCell}>6.000</Text>
          <Text style={styles.tableCell}>zsdfsdsdsd...</Text>
          <Text style={[styles.badge, { backgroundColor: "#17a2b8" }]}>Posted</Text>
          <Text style={styles.tableCell}>Kasir 1</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <FontAwesome name="eye" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PettyCashScreen;
