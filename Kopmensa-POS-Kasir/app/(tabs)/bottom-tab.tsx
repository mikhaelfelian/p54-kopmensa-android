import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import labelStyles from "@/constants/label-styles";
import CashierScreen from "../pages/Cashier";
import InvoiceScreen from "../pages/Invoice";
import GoodsScreen from "../pages/Goods";
import CashScreen from "../pages/Cash";
import RecapScreen from "../pages/Recap";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const TabIcon = ({ name, color, label }: { name: string; color: string; label: string }) => (
  <View style={styles.tabIcon}>
    <FontAwesome6 name={name} color={color} size={height * 0.028} />
    {label ? <Text style={[labelStyles.tinyDarkLabel400, { color }]}>{label}</Text> : null}
  </View>
);

const DrawerTabButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.drawerButton}>
      <FontAwesome6 name="bars" size={height * 0.026} color={colors.primary} />
    </TouchableOpacity>
  );
};

const DummyScreen = () => null;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabContainer}>
      <DrawerTabButton />

      {state.routes.map((route: any, index: number) => {
        if (route.name === "DrawerButton") return null;

        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const color = isFocused ? colors.primary : colors.gray7;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.key} accessibilityRole="button" onPress={onPress} style={styles.flexTab}>
            {options.tabBarIcon({ color, size: height * 0.028 })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="CashierScreen" screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="DrawerButton" component={DummyScreen} options={{ tabBarLabel: () => null }} />
      <Tab.Screen
        name="CashierScreen"
        component={CashierScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="calculator" color={color} label="Kasir" />,
        }}
      />
      <Tab.Screen
        name="InvoiceScreen"
        component={InvoiceScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="file-invoice" color={color} label="Invoice" />,
        }}
      />
      <Tab.Screen
        name="GoodsScreen"
        component={GoodsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="box-archive" color={color} label="Barang" />,
        }}
      />
      <Tab.Screen
        name="CashScreen"
        component={CashScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="cash-register" color={color} label="Kas" />,
        }}
      />
      <Tab.Screen
        name="RecapScreen"
        component={RecapScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="list" color={color} label="Rekap" />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: height * 0.11,
    backgroundColor: colors.light,
    elevation: 5,
  },
  drawerButton: {
    width: width * 0.06,
    alignItems: "center",
    justifyContent: "center",
  },
  flexTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTab;
