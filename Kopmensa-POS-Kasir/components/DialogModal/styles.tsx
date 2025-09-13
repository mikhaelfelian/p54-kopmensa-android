import { colors } from "@/constants/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: colors.dark,
  },
  modalDesc: {
    fontSize: 14,
    textAlign: "center",
    color: colors.dark,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
  },

  primaryButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minHeight: 40,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  primaryBorderButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 40,
  },
  primaryBorderButtonText: {
    fontWeight: "bold",
  },

  warningButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.warning,
    paddingHorizontal: 20,
    borderRadius: 10,
    minHeight: 40,
  },
  warningButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  warningBorderButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors.warning,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 40,
  },
  warningBorderButtonText: {
    color: colors.warning,
    fontWeight: "bold",
  },

  grayButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.gray1,
    paddingHorizontal: 20,
    borderRadius: 10,
    minHeight: 40,
  },
  grayButtonText: {
    fontWeight: "bold",
  },
  grayBorderButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors.gray2,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 40,
  },
  grayBorderButtonText: {
    fontWeight: "bold",
  },
});

export default styles;
