import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import styles from "./styles";
import Gap from "@/components/Gap";
import { ShiftDetail } from "@/app/models/shift";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { CloseShift, GetShiftDetail } from "@/app/services/shift";
import { dateParser } from "@/app/utils/dates";
import { formatCurrency } from "@/app/utils/currency";
import { clearAllData, getData } from "@/app/utils/localstorage";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const CloseShiftScreen: React.FC<any> = ({ route, navigation }) => {
  const params = route?.params;
  const dispatch = useDispatch();
  const [shiftDetail, setShiftDetail] = useState<ShiftDetail>();

  const [countedMoney, setCountedMoney] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    getShiftDetail();
  }, []);

  const getShiftDetail = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await GetShiftDetail(params?.id);
      setShiftDetail(response?.shift !== null ? response : null);
    } catch (error) {
      console.error("getShiftDetail", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const closeShift = async () => {
    try {
      dispatch(setIsLoading(true));

      const userData = await getData("userData");
      const _param = {
        id: params?.id,
        saldo_akhir: countedMoney,
        notes: note,
        user_id: userData?.id,
      };
      const param = JSON.stringify(_param);
      await CloseShift(param, params?.id)
        .then(async (response) => {
          if (response?.shift_code !== null) {
            await logout();
          }
        })
        .catch((error) => {
          console.log("Error Response:", error?.response?.data?.messages?.error || error?.message);
          Toast.show({
            text1: "Close Shift failed!",
            text2: error?.response?.data?.messages?.error || error?.message || "Please try again later.",
            type: "error",
          });
        });
    } catch (error) {
      console.error("getShiftDetail", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const logout = async () => {
    try {
      dispatch(setIsLoading(true));
      await clearAllData().finally(() =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          })
        )
      );
    } catch (error) {
      console.error("logout : " + error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>
        Tutup Shift: <Text style={styles.headerBold}>{shiftDetail?.shift?.shift_code}</Text>
      </Text>

      <Gap height={15} />

      <View style={styles.row}>
        {/* Left Side */}
        <View style={styles.leftBox}>
          <Text style={styles.label}>Uang yang Dihitung (Rp) *</Text>
          <TextInput style={styles.input} value={countedMoney} onChangeText={setCountedMoney} placeholder="Masukkan jumlah uang" keyboardType="numeric" />
          <Text style={styles.helperText}>Jumlah uang yang sebenarnya ada di kasir</Text>

          <Gap height={20} />

          <Text style={styles.label}>Catatan</Text>
          <TextInput style={[styles.input, styles.textarea]} value={note} onChangeText={setNote} placeholder="Catatan tambahan (opsional)" multiline />

          <Gap height={20} />

          <TouchableOpacity style={styles.closeButton} onPress={closeShift}>
            <Text style={styles.closeButtonText}>Tutup Shift</Text>
          </TouchableOpacity>
        </View>

        {/* Right Side */}
        <View style={styles.rightBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kode Shift:</Text>
            <Text style={styles.detailValue}>{shiftDetail?.shift?.shift_code}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Outlet:</Text>
            <Text style={styles.detailValue}>{shiftDetail?.shift?.outlet_name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dibuka oleh:</Text>
            <Text style={styles.detailValue}>{shiftDetail?.shift?.user_open_name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Waktu Buka:</Text>
            <Text style={styles.detailValue}>{shiftDetail?.shift?.start_at != null ? dateParser(shiftDetail?.shift?.start_at, "DD/MM/YYYY HH:mm") : ""}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Uang Modal:</Text>
            <Text style={styles.detailBold}>{formatCurrency(shiftDetail?.shift?.open_float || 0)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Transaksi:</Text>
            <Text style={styles.detailValue}>{shiftDetail?.sales_entries?.length}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pendapatan:</Text>
            <Text style={styles.detailValue}>{formatCurrency(shiftDetail?.shift?.counted_cash || 0)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kas Kecil Masuk:</Text>
            <Text style={styles.detailValue}>{formatCurrency(shiftDetail?.shift?.petty_in_total || 0)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kas Kecil Keluar:</Text>
            <Text style={styles.detailValue}>{formatCurrency(shiftDetail?.shift?.petty_out_total || 0)}</Text>
          </View>

          <View style={[styles.detailRow, styles.totalBox]}>
            <Text style={styles.detailLabel}>Total Diharapkan:</Text>
            <Text style={styles.detailBold}>{formatCurrency(shiftDetail?.shift?.expected_cash || 0)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CloseShiftScreen;
