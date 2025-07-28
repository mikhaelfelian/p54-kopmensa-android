import React, { useState } from "react";
import { View, Text, TextInput, FlatList, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { ActionButton } from "@/components/ActionButton";
import labelStyles from "@/constants/label-styles";
import Gap from "@/components/Gap";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { dateParser } from "@/app/utils/dates";

const cash = [
  { no: 1, nama: "John Doe", saldo: "37.185", kas_aktual: "Belum input", selisih: "Belum input", date: new Date() },
  { no: 2, nama: "John Wang", saldo: "40.220", kas_aktual: "Belum input", selisih: "Belum input", date: new Date() },
];

const CashScreen = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    try {
      setIsDatePickerShow(false);
      if (date) {
        setSelectedDate(date);
      }
    } catch (e) {
      console.error("onDateChange : " + e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* LEFT PANEL */}
      <View style={styles.leftPanel}>
        <View style={styles.filterBoxContainer}>
          <Text style={labelStyles.smallDarkLabel400}>Tanggal</Text>

          <Gap width={10} />
          <View style={styles.borderSeparator} />
          <Gap width={10} />

          <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsDatePickerShow(true)}>
            <Text style={labelStyles.smallDarkLabel400}>{dateParser(selectedDate, "DD-MM-YYYY")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.plusBtn}>
            <FontAwesome name="plus" size={16} color={colors.light} />
          </TouchableOpacity>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 0.2 }]}>No</Text>
          <Text style={[styles.headerCell, { flex: 0.6 }]}>Nama</Text>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Saldo</Text>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Kas Aktual</Text>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Selisih</Text>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>Tanggal</Text>
        </View>

        {/* Table Rows */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {cash.map((inv, idx) => (
            <TouchableOpacity key={idx} style={styles.tableRow}>
              <Text style={{ flex: 0.2 }}>{inv.no}</Text>
              <Text style={{ flex: 0.6 }}>{inv.nama}</Text>
              <Text style={{ flex: 0.5 }}>Rp. {inv.saldo}</Text>
              <Text style={{ flex: 0.5 }}>{inv.kas_aktual}</Text>
              <Text style={{ flex: 0.5 }}>{inv.selisih}</Text>
              <Text style={{ flex: 0.5 }}>{dateParser(inv.date, "DD MMM YYYY")}</Text>
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
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.title}>Detail Kas Masuk / Keluar</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={labelStyles.smallDarkLabel400}>KOPMENSA RSI SULTAN AGUNG</Text>
            <Text style={labelStyles.smallDarkLabel400}>Jl. Kaligawe Raya No.Km. 4, Terboyo Kulon, Kec. Genuk, Kota Semarang</Text>
            <Text style={labelStyles.smallDarkLabel400}>Telp/WA 085741220427</Text>
          </View>

          <Gap height={10} />
          <View style={styles.dividerHorizontal} />
          <Gap height={10} />

          <View>
            <Text style={labelStyles.smallDarkLabel400}>Transaksi : Kas Masuk / Keluar</Text>
            <Text style={labelStyles.smallDarkLabel400}>Tanggal : 13 Juli 2025</Text>
            <Text style={labelStyles.smallDarkLabel400}>Kasir : Alfian Hari Susatya</Text>
          </View>

          <Gap height={10} />
          <View style={styles.dividerHorizontal} />
          <Gap height={10} />

          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={labelStyles.smallDarkLabel700}>Kas Awal</Text>
              <Text style={labelStyles.smallDarkLabel700}>Rp. 0</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={labelStyles.smallDarkLabel400}>Penjualan Tunai</Text>
              <Text style={labelStyles.smallDarkLabel400}>0</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={labelStyles.smallDarkLabel400}>Kas Keluar</Text>
              <Text style={labelStyles.smallDarkLabel400}>Rp. 0</Text>
            </View>
          </View>

          <Gap height={10} />
          <View style={styles.dividerHorizontal} />
          <Gap height={10} />

          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={labelStyles.smallDarkLabel700}>Saldo Kas</Text>
              <Text style={labelStyles.smallDarkLabel700}>Rp. 0</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={labelStyles.smallDarkLabel700}>Kas Aktual</Text>
              <Text style={labelStyles.smallDarkLabel700}>Belum diinput</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={labelStyles.smallDarkLabel700}>Selisih</Text>
              <Text style={labelStyles.smallDarkLabel700}>-</Text>
            </View>
          </View>
        </View>
        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <ActionButton icon="close" label="Delete" color={colors.red3} library="FontAwesome" />
          <ActionButton icon="print" label="Struk" color={colors.blue4} library="FontAwesome" />
        </View>
      </View>

      {isDatePickerShow && <DateTimePicker value={selectedDate} mode="date" display="default" onChange={onDateChange} />}
    </SafeAreaView>
  );
};

export default CashScreen;
