import React from "react";
import { View, Text, TextInput, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import Gap from "@/components/Gap";
import labelStyles from "@/constants/label-styles";

const items = [
  { id: "1", name: "MIE TELUR CAP 3AYAM", stock: 3, price: 6000 },
  { id: "2", name: "MINYAK FRAIS WELL", stock: 3, price: 27500 },
  { id: "3", name: "MINYAK GORENG BULOG 1LT", stock: 4, price: 13500 },
  { id: "4", name: "Minyak Goreng Filma Pouch 1lt", stock: 93, price: 17000 },
  { id: "5", name: "Minyak Goreng Fortuna 2Lt", stock: 413, price: 36000 },
  { id: "6", name: "Minyak Goreng Sania 2Lt", stock: 399, price: 33000 },
  { id: "7", name: "MINYAK HEMART REFF", stock: 8, price: 14500 },
  { id: "8", name: "MINYAK KITA 1L", stock: 9, price: 22000 },
];

const GoodsScreen = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* LEFT PANEL */}
      <View style={styles.leftPanel}>
        <TextInput placeholder="Cari..." placeholderTextColor="#888" style={styles.searchInput} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemRow}>
              <View style={styles.imagePlaceholder} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>Stok: {item.stock}</Text>
                </View>
              </View>
              <Text style={styles.price}>Rp {item.price.toLocaleString("id-ID")}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.pagination}>
          <TouchableOpacity style={styles.pageButton}>
            <Text>Previous</Text>
          </TouchableOpacity>
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <TouchableOpacity key={p} style={[styles.pageButton, p === 1 && styles.activePage]}>
              <Text style={p === 1 && { color: "#fff" }}>{p}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.pageButton}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RIGHT PANEL */}
      <View style={styles.rightPanel}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.title}>Umum</Text>
          </View>
          <View style={styles.instructionBox}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="info-circle" size={16} color="#387c38" />
              <Gap width={10} />
              <Text style={labelStyles.smallDarkLabel400}>Petunjuk</Text>
            </View>
            <Text style={labelStyles.smallDarkLabel400}>
              Untuk menampilkan detail barang silakan pilih invoice penjualan disamping atau klik icon <FontAwesome name="search" size={14} /> (tampilan mobile)
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editStockButton}>
          <FontAwesome name="edit" size={18} color={colors.light} />
          <Gap width={10} />
          <Text style={labelStyles.smallLightLabel500}>Edit Stock</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GoodsScreen;
