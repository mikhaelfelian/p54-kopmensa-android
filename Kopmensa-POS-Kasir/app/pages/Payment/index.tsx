import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Image, TouchableOpacity, RefreshControl, Text } from "react-native";
import styles from "./styles";
import LoadingScreen from "@/components/LoadingScreen";
import { AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Gap from "@/components/Gap";
import { Button, TextInput } from "react-native-paper";
import BarcodeScannerModal from "@/components/BarcodeScannerModal";
import { QrExtractor } from "@/app/utils/qr-extractor";
import Toast from "react-native-toast-message";

const PaymentScreen: React.FC<any> = ({ navigation }) => {
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment",
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsScanning(true)}>
          <FontAwesome5 name="qrcode" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleScanResult = async (result: { data: string }) => {
    if (isScanning) setIsScanning(false);

    let qr = result.data;

    if (qr != undefined && qr != "") {
      let _qr = JSON.parse(qr);
      let userData = _qr.userData;
      setCustName(userData?.name);
      setCustEmail(userData?.email);
    } else {
      Toast.show({
        text1: "Error",
        text2: "Invalid QR",
        type: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addressSection}>
        <Text style={styles.addressText}>Detail Pembelian</Text>
        <TextInput label="Nama" mode="outlined" value={custName} onChangeText={(text) => setCustName(text)} />
        <TextInput label="Email" mode="outlined" value={custEmail} onChangeText={(text) => setCustEmail(text)} />
      </View>

      <View style={styles.productSection}>
        <Image
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>Keripik Singkong Lengket Pedas Manis 500gr - Balado</Text>
          <Text style={styles.productPrice}>Rp20.500</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              let _itemCount = itemCount;
              if (_itemCount > 0) _itemCount--;
              setItemCount(_itemCount);
            }}
          >
            <AntDesign name="minuscircleo" size={20} />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{itemCount}</Text>
          <TouchableOpacity
            onPress={() => {
              let _itemCount = itemCount;
              if (_itemCount >= 0) _itemCount++;
              setItemCount(_itemCount);
            }}
          >
            <AntDesign name="pluscircleo" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.totalPrice}>Total Harga (1 Barang)</Text>
        <Text style={styles.totalPriceValue}>Rp20.500</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>Bayar Sekarang</Text>
      </TouchableOpacity>

      <BarcodeScannerModal visible={isScanning} onClose={() => setIsScanning(false)} onScanResult={handleScanResult} />
    </View>
  );
};

export default PaymentScreen;
