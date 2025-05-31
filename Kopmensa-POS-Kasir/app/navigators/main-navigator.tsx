import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/Login";
import TabDashboard from "../(tabs)/drawer-navigator";
import PaymentScreen from "../pages/Payment";
import CashierScreen from "../pages/Cashier";

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
        name="Cashier"
        component={CashierScreen}
        options={{
          title: "Kasir",
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
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
