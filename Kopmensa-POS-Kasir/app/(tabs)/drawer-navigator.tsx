import { createDrawerNavigator, DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Gap from "@/components/Gap";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/LoadingReducer";
import { Logout } from "../services/session";
import { clearAllData } from "../utils/localstorage";
import { CommonActions } from "@react-navigation/native";
import DashboardScreen from "../pages/Dashboard";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { GetProfile } from "../services/inventory";
import { Profile } from "../models/profile";

interface User {
  name: string;
  imageUrl: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const [openCashier, setOpenCashier] = useState(false);
  const [openShift, setOpenShift] = useState(false);
  const [openReturnSales, setOpenReturnSales] = useState(false);
  const [userData, setUserData] = useState<Profile>();
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile();
  }, []);

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

  const getProfile = async () => {
    try {
      dispatch(setIsLoading(true));
      await GetProfile().then((response) => {
        setUserData(response?.data);
      });
    } catch (error) {
      console.log("getProfile : " + error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile */}
      <View style={styles.profileSection}>
        <Image source={{ uri: userData?.profile }} style={styles.profileImage} />
        <Gap height={10} />
        <Text style={styles.username}>{userData?.first_name}</Text>
      </View>

      {/* Default Items */}
      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setOpenCashier(!openCashier)}>
        <MaterialCommunityIcons name="point-of-sale" size={18} color="#666" />
        <Text style={styles.dropdownHeaderText}>Penjualan</Text>
        <MaterialCommunityIcons name={openCashier ? "chevron-up" : "chevron-down"} size={18} color={colors.dark} style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      {openCashier && (
        <View style={styles.dropdownList}>
          <DrawerItem label="Kasir" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("CashierScreen")} icon={() => <MaterialCommunityIcons name="point-of-sale" size={18} color="#666" />} />
          <DrawerItem label="Input Penjualan" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("SaleInputScreen")} icon={() => <MaterialCommunityIcons name="plus" size={18} color="#666" />} />
          <DrawerItem label="Data Penjualan Kasir" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("DataSalesCashierScreen")} icon={() => <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#666" />} />
        </View>
      )}

      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setOpenReturnSales(!openReturnSales)}>
        <MaterialCommunityIcons name="clock-time-five" size={18} color="#666" />
        <Text style={styles.dropdownHeaderText}>Retur Penjualan</Text>
        <MaterialCommunityIcons name={openReturnSales ? "chevron-up" : "chevron-down"} size={18} color={colors.dark} style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      {openReturnSales && (
        <View style={styles.dropdownList}>
          <DrawerItem label="Data Retur" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("DataReturnScreen")} icon={() => <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#666" />} />
          <DrawerItem label="Tukar Barang" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("ExchangeGoodsScreen")} icon={() => <FontAwesome5 name="exchange-alt" size={18} color="#666" />} />
          <DrawerItem label="Pengembalian Dana" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("ReturnFundsScreen")} icon={() => <MaterialCommunityIcons name="cash" size={18} color="#666" />} />
        </View>
      )}

      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setOpenShift(!openShift)}>
        <MaterialCommunityIcons name="clock-time-five" size={18} color="#666" />
        <Text style={styles.dropdownHeaderText}>Shift Management</Text>
        <MaterialCommunityIcons name={openShift ? "chevron-up" : "chevron-down"} size={18} color={colors.dark} style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      {openShift && (
        <View style={styles.dropdownList}>
          <DrawerItem label="Data Shift" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("DataShiftScreen")} icon={() => <MaterialCommunityIcons name="clock-time-five" size={18} color="#666" />} />
          <DrawerItem label="Buka Shift" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("OpenShiftScreen")} icon={() => <MaterialCommunityIcons name="play" size={18} color="#666" />} />
          <DrawerItem label="Petty Cash" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("PettyCashScreen")} icon={() => <MaterialCommunityIcons name="cash" size={18} color="#666" />} />
        </View>
      )}

      {/* Logout */}
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const TabDashboard: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    padding: 14,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },
  dropdownHeaderText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  dropdownList: {
    marginLeft: 20,
    marginTop: 4,
  },
  dropdownItem: {
    fontSize: 14,
    color: "#444",
    marginLeft: -10,
  },
});

export default TabDashboard;
