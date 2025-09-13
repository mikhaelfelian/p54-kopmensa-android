import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { expo } from "../../../app.json";
import { getData } from "../../utils/localstorage";
import NetInfo from "@react-native-community/netinfo";
import Gap from "@/components/Gap";
import { useDispatch } from "react-redux";
import { setSelectedOutlet } from "@/app/redux/OutletReducer";

const SplashScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const appName = expo.name;
  const appVersion = expo.version;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const unsubscribe = NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            const response = await getData("authToken");
            const selectedOutlet = await getData("selectedOutlet");

            if (response != null) {
              if (selectedOutlet != null) dispatch(setSelectedOutlet(selectedOutlet));
              navigation.navigate("TabDashboard");
            } else {
              navigation.navigate("LoginScreen");
            }
          }
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/logo.png")} style={styles.image} resizeMode="contain" />
      <Text style={styles.appTitleStyle}>{appName}</Text>
      <Gap height={2} />
      <Text style={styles.appVersionStyle}>Version: {appVersion}</Text>
      <Gap height={16} />
    </View>
  );
};

export default SplashScreen;
