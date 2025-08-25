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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { GetProfile } from "../services/inventory";
import { Profile } from "../models/profile";

interface User {
  name: string;
  imageUrl: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const [openCatalog, setOpenCatalog] = useState(false);
  const [userData, setUserData] = useState<Profile>();
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile();
  }, []);

  const logout = async () => {
    try {
      dispatch(setIsLoading(true));
      await Logout().finally(async () => {
        await clearAllData();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          })
        );
      });
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

      {/* Dropdown Section */}
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setOpenCatalog(!openCatalog)}>
        <MaterialCommunityIcons name="briefcase" size={18} color="#666" />
        <Text style={styles.dropdownHeaderText}>Katalog</Text>
        <MaterialCommunityIcons name={openCatalog ? "chevron-up" : "chevron-down"} size={18} color={colors.dark} style={{ marginLeft: "auto" }} />
      </TouchableOpacity>

      {openCatalog && (
        <View style={styles.dropdownList}>
          <DrawerItem label="Merk" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("MerkScreen")} icon={() => <MaterialCommunityIcons name="tag" size={18} color="#666" />} />
          <DrawerItem label="Kategori" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("CategoryScreen")} icon={() => <MaterialCommunityIcons name="view-list" size={18} color="#666" />} />
          <DrawerItem label="Varian" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("VariantScreen")} icon={() => <MaterialCommunityIcons name="palette" size={18} color="#666" />} />
          <DrawerItem label="Item" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("ItemScreen")} icon={() => <MaterialCommunityIcons name="cube" size={18} color="#666" />} />
          <DrawerItem label="Satuan" labelStyle={styles.dropdownItem} onPress={() => navigation.navigate("UnitScreen")} icon={() => <MaterialCommunityIcons name="ruler" size={18} color="#666" />} />
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
