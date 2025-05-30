import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import styles from "./styles";

type LoadingScreenProps = {
  visible: boolean;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

export default LoadingScreen;
