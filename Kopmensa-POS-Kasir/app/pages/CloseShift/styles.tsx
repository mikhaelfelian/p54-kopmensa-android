import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 15,
  },
  header: {
    fontSize: fontSize.large,
    color: colors.dark,
  },
  headerBold: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftBox: {
    flex: 1,
    marginRight: 15,
  },
  rightBox: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  label: {
    fontSize: fontSize.normal,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 6,
    padding: 10,
    fontSize: fontSize.normal,
    backgroundColor: colors.light,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  helperText: {
    fontSize: fontSize.small,
    color: colors.gray12,
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: colors.yellow,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: fontSize.normal,
    fontWeight: "bold",
    color: colors.dark,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: fontSize.small,
    color: colors.dark,
  },
  detailValue: {
    fontSize: fontSize.small,
    color: colors.dark,
  },
  detailBold: {
    fontSize: fontSize.small,
    fontWeight: "bold",
    color: colors.dark,
  },
  totalBox: {
    backgroundColor: colors.gray9,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginTop: 10,
  },
});

export default styles;
