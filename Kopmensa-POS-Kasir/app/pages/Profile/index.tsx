import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, RefreshControl, Text } from "react-native";
import styles from "./styles";
import LoadingScreen from "@/components/LoadingScreen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Gap from "@/components/Gap";
import { Button } from "react-native-paper";

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const [isBusy, setIsBusy] = useState(false);

  let userData = {
    name: "Susilo Bambang",
    email: "susilolilo@noemail.com",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.profileSection}>
          <MaterialIcons name="account-circle" size={60} />

          <Gap width={5} />

          <View style={styles.infoContainer}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("UserQRScreen", { userData })}>
            <FontAwesome name="qrcode" size={22} />
          </TouchableOpacity>

          <Gap width={14} />

          <TouchableOpacity>
            <FontAwesome name="pencil-square-o" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {isBusy && <LoadingScreen visible={isBusy} />}
    </View>
  );
};

export default ProfileScreen;
