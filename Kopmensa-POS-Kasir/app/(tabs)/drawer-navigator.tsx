import { createDrawerNavigator, DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ProfileScreen from "../pages/Profile";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Gap from "@/components/Gap";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../redux/LoadingReducer";
import BottomTab from "./bottom-tab";
import { Logout } from "../services/session";
import { clearAllData } from "../utils/localstorage";
import { CommonActions } from "@react-navigation/native";

interface User {
  name: string;
  imageUrl: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const user: User = {
    name: "John Doe",
    imageUrl: "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
  };
  const dispatch = useDispatch();

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

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileSection}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Gap height={10} />
        <Text style={styles.username}>{user.name}</Text>
      </TouchableOpacity>

      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const TabDashboard: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={BottomTab} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    padding: 14,
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default TabDashboard;
