import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text, BackHandler } from "react-native";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

const RecapScreen: React.FC<any> = ({ navigation }) => {
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

export default RecapScreen;
