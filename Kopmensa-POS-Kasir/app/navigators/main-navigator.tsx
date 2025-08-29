import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/Login";
import TabDashboard from "../(tabs)/drawer-navigator";
import WebViewScreen from "../pages/WebView";
import DashboardScreen from "../pages/Dashboard";
import MerkScreen from "../pages/Merk";
import CategoryScreen from "../pages/Category";
import VariantScreen from "../pages/Variant";
import ItemScreen from "../pages/Item";
import UnitScreen from "../pages/Unit";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          title: "Splash Screen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TabDashboard"
        component={TabDashboard}
        options={{
          title: "Tab Dashboard",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MerkScreen"
        component={MerkScreen}
        options={{
          title: "Merk",
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          title: "Kategori",
        }}
      />
      <Stack.Screen
        name="VariantScreen"
        component={VariantScreen}
        options={{
          title: "Varian",
        }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          title: "Item",
        }}
      />
      <Stack.Screen
        name="UnitScreen"
        component={UnitScreen}
        options={{
          title: "Satuan",
        }}
      />
    </Stack.Navigator>
  );
}
