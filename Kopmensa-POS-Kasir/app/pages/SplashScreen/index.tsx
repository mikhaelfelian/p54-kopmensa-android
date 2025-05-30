import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { expo } from "../../../app.json";
import { getData, removeData, updateData } from "../../utils/localstorage";
import NetInfo from "@react-native-community/netinfo";
import { RefreshToken } from "@/app/services/session";
import Gap from "@/components/Gap";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const appName = expo.name;
  const appVersion = expo.version;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const unsubscribe = NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            await checkToken();
            const response = await getData("userData");
            console.log(response);
            if (response && response.accessToken) {
              navigation.navigate("Home");
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

  const checkToken = async () => {
    const data = await getData("userData");
    if (data && data.accessToken) {
      const _data = data;

      try {
        const response = await RefreshToken(_data.refreshToken);
        if (response && response.accessToken) {
          _data.accessToken = response.result.accessToken;
          await updateData("userData", _data);
        } else {
          await removeData("userData");
        }
      } catch {
        await removeData("userData");
      }
    } else {
      await removeData("userData");
    }
  };

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
