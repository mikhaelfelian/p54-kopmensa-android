import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, BackHandler } from "react-native";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

const CashierScreen: React.FC<any> = ({ navigation }) => {
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
    </SafeAreaView>
  );
};

export default CashierScreen;
