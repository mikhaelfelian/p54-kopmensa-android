import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert, Platform, PermissionsAndroid } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { CreateTransaction, GetPaymentMethods } from "@/app/services/sales";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { Payment } from "@/app/models/payment";
import BottomSheet from "@devvie/bottom-sheet";
import BottomSheetListing from "../BottomSheetListing";
import { formatCurrency } from "@/app/utils/currency";
import { getData } from "@/app/utils/localstorage";
import { generateRandomString } from "@/app/utils/converter";
import { dateParser } from "@/app/utils/dates";
import { CartSubmit, HistSubmit, PlatformSubmit } from "@/app/models/cart";
import Toast from "react-native-toast-message";
import { GetShiftList } from "@/app/services/shift";
import { Shift } from "@/app/models/shift";
import Gap from "../Gap";
import { clearCart } from "@/app/redux/CartReducer";
import { discoverPrinters, printReceipt } from "@/app/utils/print";
import { BLEPrinter } from "react-native-thermal-receipt-printer";

interface PaymentMethod {
  id: number;
  platform: string;
  amount: string;
  note: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  customerID: string;
}

const PaymentModal: React.FC<Props> = ({ visible, onClose, customerID }) => {
  const dispatch = useDispatch();
  const [noNota, setNoNota] = useState("");
  const [shiftList, setShiftList] = useState<Shift[]>([]);
  const [selectedShift, setSelectedShift] = useState<Shift>();
  const shiftSheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);
  const [paymentOptions, setPaymentOptions] = useState<Payment[]>([]);
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      platform: paymentOptions.length > 0 ? paymentOptions[0].name : "",
      amount: "",
      note: "",
    },
  ]);
  const selectedOutlet = useSelector((state: RootState) => state.selectedOutlet.selected);
  const cart = useSelector((state: RootState) => state.cart);
  const [activeMethodId, setActiveMethodId] = useState<number | null>(null);
  const paymentSheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);
  const subtotal = cart.totalPrice;
  const [discountValue, setDiscountValue] = useState<string>("0");
  const discountOptions = [
    {
      id: 1,
      type: "Rp",
    },
    {
      id: 2,
      type: "%",
    },
  ];
  const [selectedDiscount, setSelectedDiscount] = useState(discountOptions[0]);
  const discountSheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);
  const parsedDiscount = parseFloat(discountValue) || 0;
  let discount = 0;
  if (selectedDiscount.type === "Rp") {
    discount = parsedDiscount;
  } else if (selectedDiscount.type === "%") {
    discount = (subtotal * parsedDiscount) / 100;
  }
  const totalPay = methods.reduce((sum, m) => sum + parseInt(m.amount || "0", 10), 0);
  const remain = Math.max(0, subtotal - discount - totalPay);
  const cashback = subtotal - discount - totalPay < 0 ? Math.abs(subtotal - discount - totalPay) : 0;

  const printerSheetRef = useRef<any>(null);
  const [pairedPrinters, setPairedPrinters] = useState<any[]>([]);

  useEffect(() => {
    setMethods([
      {
        id: 1,
        platform: paymentOptions.length > 0 ? paymentOptions[0].name : "",
        amount: "",
        note: "",
      },
    ]);
  }, [visible]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (paymentOptions.length > 0) {
      setMethods((prev) => prev.map((m, i) => (i === 0 && (!m.platform || m.platform === "") ? { ...m, platform: paymentOptions[0].name } : m)));
    }
  }, [paymentOptions]);

  const fetchData = async () => {
    try {
      setNoNota(generateRandomString());
      await Promise.all([getPayments(), getShiftList()]);
    } catch (error) {
      console.log("fetchData : " + error);
    }
  };

  const getShiftList = async () => {
    try {
      const outletID = selectedOutlet ? selectedOutlet.id.toString() : "";
      let page = 1;
      let allItems: any[] | ((prevState: Shift[]) => Shift[]) = [];
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await GetShiftList(outletID, page.toString());
        const items = response?.items || [];

        const openItems = items.filter((item: Shift) => item.status === "open" && item.outlet_id === selectedOutlet?.id);

        if (items.length === 0) {
          hasMoreData = false;
        } else {
          allItems = [...allItems, ...openItems];
          page += 1;
        }
      }

      setShiftList(allItems);
    } catch (error) {
      console.error("getShiftList error", error);
    }
  };

  const addMethod = () => {
    const defaultPlatform = paymentOptions.length > 0 ? paymentOptions[0].name : "";

    setMethods([...methods, { id: Date.now(), platform: defaultPlatform, amount: "0", note: "" }]);
  };

  const removeMethod = (id: number) => {
    setMethods(methods.filter((m) => m.id !== id));
  };

  const getPayments = async () => {
    try {
      await GetPaymentMethods().then((response) => {
        let _items = response?.payment_methods;
        _items = _items?.filter((x: Payment) => x?.type === "platform");
        setPaymentOptions(_items);
      });
    } catch (error) {
      console.log("getPayments : " + error);
    }
  };

  const proceedTransaction = async () => {
    try {
      dispatch(setIsLoading(true));

      const userData = await getData("userData");

      let _cart: CartSubmit[] = [];
      let _hist: HistSubmit[] = [];

      cart.items.forEach((item) => {
        const _cartItem = {
          id_item: item.id,
          id_satuan: item.id,
          id_kategori: item.id_kategori,
          id_merk: item.id_merk,
          no_nota: noNota,
          kode: item.kode,
          produk: item.item,
          satuan: "PCS",
          harga: item.harga_jual,
          harga_beli: item.harga_beli,
          jml: cart.items.filter((x) => x.id === item.id).length,
          jml_satuan: 1,
          subtotal: item.harga_jual,
        };

        _cart.push(_cartItem);

        const _histItem = {
          id_item: item.id,
          id_satuan: item.id,
          id_gudang: selectedOutlet?.id,
          id_user: userData?.id,
          id_pelanggan: customerID,
          tgl_masuk: dateParser(new Date(), "YYYY-MM-DD HH:mm:ss"),
          no_nota: noNota,
          kode: item.kode,
          item: item.item,
          nominal: item?.harga_jual,
          jml: cart.items.filter((x) => x.id === item.id).length,
          jml_satuan: 1,
          satuan: "PCS",
          status: "1",
        };
        _hist.push(_histItem);
      });

      let _platforms: PlatformSubmit[] = [];
      methods.forEach((item) => {
        const _platformItem = {
          id_platform: item.id,
          no_nota: noNota,
          platform: "platform",
          keterangan: item.note,
          nominal: item.amount,
        };

        _platforms.push(_platformItem);
      });

      const _param = {
        id_user: userData?.id,
        id_sales: userData?.id,
        id_pelanggan: customerID !== "" ? customerID : "1",
        id_shift: selectedShift?.shift_code,
        id_gudang: selectedOutlet?.id,
        no_nota: noNota,
        tgl_masuk: dateParser(new Date(), "YYYY-MM-DD HH:mm:ss"),
        tgl_bayar: dateParser(new Date(), "YYYY-MM-DD HH:mm:ss"),
        jml_total: subtotal,
        jml_subtotal: subtotal,
        diskon: discount,
        jml_diskon: discount,
        ppn: 11,
        jml_ppn: Math.floor(cart.tax),
        jml_gtotal: subtotal,
        jml_bayar: totalPay,
        jml_kembali: cashback,
        metode_bayar: "cash",
        status: "1",
        status_nota: "1",
        status_bayar: "1",
        status_ppn: "1",
        cart: _cart,
        platform: _platforms,
        hist: _hist,
      };
      const param = JSON.stringify(_param);
      await CreateTransaction(param)
        .then((response) => {
          if (response?.no_nota != null) {
            dispatch(clearCart());
            onClose();
            Toast.show({
              text1: "Success",
              text2: "Transaksi berhasil!",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log("Error Response:", error.response.data);
          Toast.show({
            text1: "Error!",
            text2: error.response.data ?? "Please try again later.",
            type: "error",
          });
        });
    } catch (error) {
      console.log("proceedTransaction : " + error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const onProceedPrint = async () => {
    try {
      const hasPermission = await requestBluetoothPermissions();
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Bluetooth permission is required");
        return;
      }

      const devices = await discoverPrinters();
      if (!devices || devices.length === 0) {
        Alert.alert("No Printer Found", "Please make sure your printer is ON and paired in Bluetooth settings");
        return;
      }

      setPairedPrinters(devices);
      printerSheetRef.current.open();
    } catch (err) {
      console.error("❌ Print Init Error:", err);
    }
  };

  async function requestBluetoothPermissions() {
    if (Platform.OS === "android") {
      if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);
        return (
          granted["android.permission.BLUETOOTH_SCAN"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.BLUETOOTH_CONNECT"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <FontAwesome name="credit-card" size={18} />
            <Text style={styles.headerText}> Transaksi & Pembayaran</Text>
            <TouchableOpacity onPress={onClose} style={{ marginLeft: "auto" }}>
              <MaterialIcons name="close" size={22} />
            </TouchableOpacity>
          </View>

          {/* Select Shift */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Pilih Shift</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.platformBox} onPress={() => shiftSheetRef.current.open()}>
                <Text>{selectedShift?.user_open_name ?? "Pilih Kasir"}</Text>
                <MaterialIcons name="arrow-drop-down" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <Gap height={15} />

          {/* Ringkasan Transaksi */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Ringkasan Transaksi</Text>
            <View style={styles.row}>
              <Text>Subtotal:</Text>
              <Text>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={[styles.row, { alignItems: "center" }]}>
              <Text>Diskon:</Text>
              <View style={styles.discountRow}>
                <TextInput style={styles.discountInput} placeholder="0" keyboardType="numeric" value={discountValue} onChangeText={setDiscountValue} />
                <TouchableOpacity style={styles.dropdown} onPress={() => discountSheetRef?.current?.open()}>
                  <Text>{selectedDiscount.type}</Text>
                  <MaterialIcons name="arrow-drop-down" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDiscountValue("0")}>
                  <MaterialIcons name="close" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Daftar Metode Pembayaran */}
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Daftar Metode Pembayaran</Text>

            <FlatList
              data={methods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.paymentRow}>
                  <TouchableOpacity
                    style={styles.platformBox}
                    onPress={() => {
                      setActiveMethodId(item.id);
                      paymentSheetRef?.current?.open();
                    }}
                  >
                    <Text>{item.platform}</Text>
                    <MaterialIcons name="arrow-drop-down" size={22} color="black" />
                  </TouchableOpacity>
                  <TextInput style={styles.amountInput} keyboardType="numeric" value={item.amount} placeholder="0" onChangeText={(val) => setMethods((prev) => prev.map((m) => (m.id === item.id ? { ...m, amount: val } : m)))} />
                  <TextInput style={styles.noteInput} placeholder="Catatan pembayaran" value={item.note} onChangeText={(val) => setMethods((prev) => prev.map((m) => (m.id === item.id ? { ...m, note: val } : m)))} />
                  {methods.length > 1 && (
                    <TouchableOpacity onPress={() => removeMethod(item.id)} style={{ marginLeft: 6 }}>
                      <MaterialIcons name="close" size={22} color="red" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />

            <TouchableOpacity style={styles.addButton} onPress={addMethod}>
              <Text style={{ color: "#007bff", fontWeight: "bold" }}>+ Tambah</Text>
            </TouchableOpacity>
          </View>

          {/* Total Section */}
          <View style={styles.totalBox}>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Bayar</Text>
              <Text style={styles.totalLabel}>{formatCurrency(totalPay)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Kurang</Text>
              <Text style={[styles.totalLabel, { color: "red" }]}>{formatCurrency(remain)}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: "green" }]} onPress={proceedTransaction}>
              <FontAwesome name="check" color="#fff" />
              <Text style={styles.btnText}> Proses</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.btn, { backgroundColor: "orange" }]}>
              <FontAwesome name="save" color="#fff" />
              <Text style={styles.btnText}> Draft</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={[styles.btn, { backgroundColor: "teal" }]} onPress={onProceedPrint}>
              <FontAwesome name="print" color="#fff" />
              <Text style={styles.btnText}> Print</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: "red" }]} onPress={onClose}>
              <MaterialIcons name="close" color="#fff" />
              <Text style={styles.btnText}> Batal</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetListing
        sheetRef={paymentSheetRef}
        title={"Payment Options"}
        isSearchQuery={false}
        listItem={paymentOptions}
        itemKey={["name"]}
        onSelectItem={async (item) => {
          paymentSheetRef.current.close();
          if (activeMethodId !== null) {
            setMethods((prev) => prev.map((m) => (m.id === activeMethodId ? { ...m, platform: item.name } : m)));
          }

          setActiveMethodId(null);
        }}
      />

      <BottomSheetListing
        sheetRef={discountSheetRef}
        title={"Discount Options"}
        isSearchQuery={false}
        listItem={discountOptions}
        itemKey={["type"]}
        onSelectItem={async (item) => {
          discountSheetRef.current.close();
          setSelectedDiscount(item);
        }}
      />

      <BottomSheetListing
        sheetRef={shiftSheetRef}
        title={"Shift List"}
        isSearchQuery={false}
        listItem={shiftList}
        itemKey={["user_open_name"]}
        onSelectItem={async (item) => {
          shiftSheetRef.current.close();
          setSelectedShift(item);
        }}
      />

      <BottomSheetListing
        sheetRef={printerSheetRef}
        title={"Pilih Printer"}
        isSearchQuery={false}
        listItem={pairedPrinters}
        itemKey={["name"]}
        onSelectItem={async (device) => {
          printerSheetRef.current.close();

          try {
            await BLEPrinter.connectPrinter(device.inner_mac_address);
            console.log("✅ Connected to printer:", device.device_name);

            await printReceipt(cart, noNota);
          } catch (err) {
            console.error("❌ Printer Connection Error:", err);
            Alert.alert("Error", "Failed to connect to printer");
          }
        }}
      />
    </Modal>
  );
};

export default PaymentModal;
