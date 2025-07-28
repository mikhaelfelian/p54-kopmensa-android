import React, { useState } from "react";
import { View, Text, TextInput, FlatList, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, Alert, Button, Image } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { ActionButton } from "@/components/ActionButton";
import labelStyles from "@/constants/label-styles";
import Gap from "@/components/Gap";
import * as ImagePicker from "expo-image-picker";

const invoices = [
  { no: 1, invoice: "000003/INV/JWD/2025", date: "19-04-2025", total: "64.000" },
  { no: 2, invoice: "000002/INV/JWD/2025", date: "19-04-2025", total: "37.185" },
  { no: 3, invoice: "000001/INV/JWD/2025", date: "18-03-2025", total: "34.965" },
  { no: 4, invoice: "002202/INV/JWD/2024", date: "31-12-2024", total: "1.681.606" },
  { no: 5, invoice: "002201/INV/JWD/2024", date: "31-12-2024", total: "590.853" },
  { no: 6, invoice: "002200/INV/JWD/2024", date: "31-12-2024", total: "752.572" },
  { no: 7, invoice: "002199/INV/JWD/2024", date: "31-12-2024", total: "1.097.285" },
  { no: 8, invoice: "002198/INV/JWD/2024", date: "31-12-2024", total: "704.073" },
  { no: 9, invoice: "002197/INV/JWD/2024", date: "31-12-2024", total: "1.019.573" },
  { no: 10, invoice: "002196/INV/JWD/2024", date: "31-12-2024", total: "549.561" },
];

const InvoiceScreen = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");
  const [activePanel, setActivePanel] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Access to photo library is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Access to camera is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* LEFT PANEL */}
      <View style={styles.leftPanel}>
        <TextInput placeholder="Cari..." placeholderTextColor="#888" style={styles.searchInput} />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 0.2 }]}>No</Text>
          <Text style={styles.headerCell}>No. Invoice</Text>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Tanggal</Text>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Total</Text>
        </View>

        {/* Table Rows */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {invoices.map((inv, idx) => (
            <TouchableOpacity key={idx} style={styles.tableRow}>
              <Text style={{ flex: 0.2 }}>{inv.no}</Text>
              <Text style={{ flex: 1 }}>{inv.invoice}</Text>
              <Text style={{ flex: 0.5 }}>{inv.date}</Text>
              <Text style={{ flex: 0.5 }}>{inv.total}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.title}>Umum</Text>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {activePanel.length <= 0 && (
              <View style={styles.instructionBox}>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome name="info-circle" size={16} color="#387c38" />
                  <Gap width={10} />
                  <Text style={labelStyles.smallDarkLabel400}>Petunjuk</Text>
                </View>
                <Text style={labelStyles.smallDarkLabel400}>
                  Untuk menampilkan data penjualan silakan pilih invoice penjualan disamping atau klik icon <FontAwesome name="search" size={14} /> (tampilan mobile)
                </Text>
              </View>
            )}

            {activePanel == "Refund" && (
              <View>
                <TextInput placeholder="Alasan refund" placeholderTextColor="#888" style={styles.refundInput} multiline />

                <View style={styles.buttonContainer}>
                  <Button title="Pilih dari Galeri" onPress={handlePickImage} />
                  <Button title="Ambil Foto" onPress={handleTakePhoto} />
                </View>

                {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

                <Gap height={20} />

                <TouchableOpacity style={styles.payButton}>
                  <Text style={styles.payButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <ActionButton icon="edit" label="Edit Bayar" color="#D5A3E6" />
          <ActionButton icon="edit" label="Edit" color="#B5AEE5" />
          <ActionButton icon="print" label="Nota" color="#AEE5B7" library="FontAwesome" />
          <ActionButton icon="receipt" label="Invoice" color="#FFBB7E" library="MaterialIcons" />
          <ActionButton icon="file-pdf-o" label="PDF" color="#F59595" library="FontAwesome" />
          <ActionButton icon="send" label="Email" color="#A3D4F7" />
          <ActionButton icon="settings-backup-restore" label="Refund" color="#A3D4F7" library="MaterialIcons" onPress={() => setActivePanel("Refund")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceScreen;
