import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: height,
    backgroundColor: "white",
    borderRadius: 0,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "red",
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  barcodeScanner: {
    width: "100%",
    height: "100%",
  },
  scannedOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 15,
    borderRadius: 10,
  },
  scannedText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
