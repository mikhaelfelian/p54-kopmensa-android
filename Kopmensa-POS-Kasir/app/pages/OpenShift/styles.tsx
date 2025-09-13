import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/constants/constants";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
  },
  required: {
    color: "red",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: "#000",
  },
  hintText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: "#16A6B6",
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  infoList: {
    marginTop: 4,
  },
  infoText: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default styles;
