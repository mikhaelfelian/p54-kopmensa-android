import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, Text, BackHandler } from "react-native";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "@/components/LoadingScreen";

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);

  useEffect(() => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text>Oke</Text>
        </View>
      </ScrollView>
      {isBusy && <LoadingScreen visible={isBusy} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
