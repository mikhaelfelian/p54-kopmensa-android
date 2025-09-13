import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/Login";
import TabDashboard from "../(tabs)/drawer-navigator";
import WebViewScreen from "../pages/WebView";
import DashboardScreen from "../pages/Dashboard";
import CashierScreen from "../pages/Cashier";
import SaleInputScreen from "../pages/SaleInputScreen";
import DataSalesCashierScreen from "../pages/DataSalesCashier";
import DataSalesScreen from "../pages/DataSales";
import DataShiftScreen from "../pages/DataShift";
import OpenShiftScreen from "../pages/OpenShift";
import PettyCashScreen from "../pages/PettyCash";
import DataReturnScreen from "../pages/DataReturn";
import ExchangeGoodsScreen from "../pages/ExchangeGoods";
import ReturnFundsScreen from "../pages/ReturnFunds";
import PettyCashCategoryScreen from "../pages/PettyCashCategory";
import DetailShiftScreen from "../pages/DetailShift";
import CloseShiftScreen from "../pages/CloseShift";

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
        name="CashierScreen"
        component={CashierScreen}
        options={{
          title: "Kasir",
        }}
      />
      <Stack.Screen
        name="SaleInputScreen"
        component={SaleInputScreen}
        options={{
          title: "Buat Transaksi Penjualan",
        }}
      />
      <Stack.Screen
        name="DataSalesCashierScreen"
        component={DataSalesCashierScreen}
        options={{
          title: "Kasir - Transaksi Penjualan",
        }}
      />
      <Stack.Screen
        name="DataSalesScreen"
        component={DataSalesScreen}
        options={{
          title: "Data Penjualan",
        }}
      />
      <Stack.Screen
        name="DataShiftScreen"
        component={DataShiftScreen}
        options={{
          title: "Shift Manajemen",
        }}
      />
      <Stack.Screen
        name="OpenShiftScreen"
        component={OpenShiftScreen}
        options={{
          title: "Buka Shift",
        }}
      />
      <Stack.Screen
        name="PettyCashScreen"
        component={PettyCashScreen}
        options={{
          title: "Petty Cash",
        }}
      />
      <Stack.Screen
        name="DataReturnScreen"
        component={DataReturnScreen}
        options={{
          title: "Data Retur Penjualan",
        }}
      />
      <Stack.Screen
        name="ExchangeGoodsScreen"
        component={ExchangeGoodsScreen}
        options={{
          title: "Retur Penjualan - Tukar Barang",
        }}
      />
      <Stack.Screen
        name="ReturnFundsScreen"
        component={ReturnFundsScreen}
        options={{
          title: "Daftar Permintaan Refunds",
        }}
      />
      <Stack.Screen
        name="PettyCashCategoryScreen"
        component={PettyCashCategoryScreen}
        options={{
          title: "Kategori Petty Cash",
        }}
      />
      <Stack.Screen
        name="DetailShiftScreen"
        component={DetailShiftScreen}
        options={{
          title: "Detail Shift",
        }}
      />
      <Stack.Screen
        name="CloseShiftScreen"
        component={CloseShiftScreen}
        options={{
          title: "Close Shift",
        }}
      />
    </Stack.Navigator>
  );
}
