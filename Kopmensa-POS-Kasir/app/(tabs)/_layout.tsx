import { createDrawerNavigator, DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer";
import React, { useState } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ProfileScreen from "../pages/Profile";
import HomeScreen from "../pages/Home";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Gap from "@/components/Gap";
import LoadingScreen from "@/components/LoadingScreen";

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
  const [isBusy, setIsBusy] = useState(false);

  const logout = () => {
    setIsBusy(true);
    navigation.navigate("LoginScreen");
    setIsBusy(false);
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

      <LoadingScreen visible={isBusy} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const TabDashboard: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
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
