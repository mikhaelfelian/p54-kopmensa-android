import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import styles from "./styles";

type BarcodeScannerModalProps = {
  visible: boolean;
  onClose: () => void;
  onScanResult: (result: BarCodeScannerResult) => void;
};

const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({ visible, onClose, onScanResult }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (result: BarCodeScannerResult) => {
    setScanned(true);
    onScanResult(result);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <View style={styles.scannerContainer}>
            {!scanned && <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.barcodeScanner} />}
            {scanned && (
              <View style={styles.scannedOverlay}>
                <Text style={styles.scannedText}>Scan Complete!</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BarcodeScannerModal;
