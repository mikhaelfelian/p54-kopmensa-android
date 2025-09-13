import "react-native-gesture-handler";
import React from "react";
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Gap from "../Gap";
import { colors } from "@/constants/constants";
import styles from "./styles";

interface DialogModalProps {
  modalVisibility: boolean;
  numberOption?: number;
  title?: string;
  desc?: string;
  button1Text: string;
  button1Color?: string;
  onPressButton1: () => void;
  button2Text?: string;
  button2Color?: string;
  onPressButton2?: () => void;
  isCloseButton?: boolean;
  closeText?: string;
  onPressCloseBtn?: () => void;
  onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({
  modalVisibility,
  numberOption = 1,
  title,
  desc,
  button1Text,
  button1Color = colors.primary,
  onPressButton1,
  button2Text,
  button2Color = colors.primary,
  onPressButton2,
  isCloseButton = true,
  closeText = "Close",
  onPressCloseBtn,
  onClose,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisibility} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Gap height={10} />
            {title && (
              <View>
                <Text style={styles.modalTitle}>{title}</Text>
                <Gap height={15} />
              </View>
            )}
            {desc && (
              <View>
                <Text style={styles.modalDesc}>{desc}</Text>
                <Gap height={25} />
              </View>
            )}

            {numberOption > 0 && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.primaryButton, { backgroundColor: button1Color }]} onPress={onPressButton1}>
                  <Text style={styles.primaryButtonText}>{button1Text}</Text>
                </TouchableOpacity>

                {numberOption === 2 && (
                  <>
                    <Gap height={10} />

                    <TouchableOpacity style={[styles.primaryBorderButton, { borderColor: button2Color }]} onPress={onPressButton2}>
                      <Text style={[styles.primaryBorderButtonText, { color: button2Color }]}>{button2Text}</Text>
                    </TouchableOpacity>
                  </>
                )}

                <Gap height={10} />
              </View>
            )}

            {isCloseButton && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.grayBorderButton} onPress={onPressCloseBtn || onClose}>
                  <Text style={styles.grayBorderButtonText}>{closeText}</Text>
                </TouchableOpacity>
                <Gap height={10} />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DialogModal;
