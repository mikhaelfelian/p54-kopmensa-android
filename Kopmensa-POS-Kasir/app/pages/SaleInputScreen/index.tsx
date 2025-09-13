import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import styles from "./styles";
import labelStyles from "@/constants/label-styles";
import { colors } from "@/constants/constants";
import Gap from "@/components/Gap";

const SaleInputScreen: React.FC<any> = () => {
  return <ScrollView style={styles.container}></ScrollView>;
};

export default SaleInputScreen;
