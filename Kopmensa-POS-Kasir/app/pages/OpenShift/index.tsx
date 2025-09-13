import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { OutletItem } from "@/app/models/outlet";
import BottomSheet from "@devvie/bottom-sheet";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { GetOutlets } from "@/app/services/inventory";
import BottomSheetListing from "@/components/BottomSheetListing";
import { OpenShift } from "@/app/services/shift";
import Toast from "react-native-toast-message";
import { getData } from "@/app/utils/localstorage";
import { toUrlEncoded } from "@/app/utils/converter";
import { setSelectedOutlet } from "@/app/redux/OutletReducer";

const OpenShiftScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedOutletShift, setSelectedOutletShift] = useState<OutletItem>();
  const [outletList, setOutletList] = useState<OutletItem[]>([]);
  const [openingFloat, setOpeningFloat] = useState("");
  const outletSheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);

  useEffect(() => {
    getOutlets();
  }, []);

  const getOutlets = async () => {
    try {
      dispatch(setIsLoading(true));

      let page = "1";
      let perPage = "10";

      await GetOutlets(page, perPage).then((response) => {
        setOutletList(response?.outlets ?? []);
      });
    } catch (error) {
      console.error("getOutlets : ", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const onOpenShift = async () => {
    try {
      dispatch(setIsLoading(true));

      const userData = await getData("userData");

      if (!selectedOutletShift) {
        Toast.show({
          text1: "Outlet required!",
          text2: `Silahkan pilih outlet terlebih dahulu.`,
          type: "error",
        });
        return;
      }

      if (!openingFloat || isNaN(Number(openingFloat)) || Number(openingFloat) <= 0) {
        Toast.show({
          text1: "Invalid amount!",
          text2: "Opening float harus lebih dari 0.",
          type: "error",
        });
        return;
      }

      const _param = {
        outlet_id: selectedOutletShift?.id,
        saldo_awal: openingFloat,
        user_id: userData?.id,
      };
      const param = toUrlEncoded(_param);
      await OpenShift(param)
        .then((response) => {
          if (response?.shift_code != null) {
            dispatch(setSelectedOutlet(selectedOutletShift));
            navigation.navigate("CashierScreen");
          }
        })
        .catch((error) => {
          console.log("Error Response:", error.response.data);
          Toast.show({
            text1: "Open Shift failed!",
            text2: error.response.data.messages.error ?? "Please try again later.",
            type: "error",
          });
        });
    } catch (error) {
      console.error("onOpenShift : ", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formSection}>
        <Text style={styles.label}>
          Outlet <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => outletSheetRef.current.open()}>
          <Text style={styles.dropdownText}>{selectedOutletShift != null ? selectedOutletShift?.nama : "Select Outlet"}</Text>
          <FontAwesome name="chevron-down" size={14} color="#444" />
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 16 }]}>
          Opening Float (Rp) <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={openingFloat}
          onChangeText={(text) => {
            setOpeningFloat(text);
          }}
        />
        <Text style={styles.hintText}>Jumlah uang yang tersedia di kasir saat shift dibuka</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoHeader}>
          <FontAwesome name="info-circle" size={16} color="#fff" />
          <Text style={styles.infoTitle}> Petunjuk</Text>
        </View>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• Shift harus dibuka sebelum melakukan transaksi</Text>
          <Text style={styles.infoText}>• Opening float adalah uang yang tersedia di kasir</Text>
          <Text style={styles.infoText}>• Setelah shift dibuka, semua transaksi akan tercatat</Text>
          <Text style={styles.infoText}>• Shift dapat ditutup dan disetujui oleh manager</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onOpenShift}>
        <FontAwesome name="play" size={14} color="#fff" />
        <Text style={styles.buttonText}> Buka Shift</Text>
      </TouchableOpacity>

      <BottomSheetListing
        sheetRef={outletSheetRef}
        title={"Outlets"}
        isSearchQuery={false}
        listItem={outletList}
        itemKey={["nama"]}
        onSelectItem={async (item) => {
          setSelectedOutletShift(item);
          outletSheetRef.current.close();
        }}
      />
    </View>
  );
};

export default OpenShiftScreen;
