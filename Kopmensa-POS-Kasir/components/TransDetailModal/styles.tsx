import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/constants";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: colors.light,
    borderRadius: 8,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: fontSize.large,
    fontWeight: "600",
    color: colors.dark,
    marginLeft: 6,
  },
  icon: {
    color: colors.gray15,
  },
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray2,
    paddingVertical: 10,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: fontSize.normal,
    marginBottom: 4,
    color: colors.dark,
  },
  infoLabelBold: {
    fontSize: fontSize.medium,
    fontWeight: "700",
    marginTop: 4,
    color: colors.dark,
  },
  bold: { fontWeight: "700" },
  statusSuccess: {
    backgroundColor: colors.green,
    color: colors.light,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  statusPaid: {
    backgroundColor: colors.primaryDark,
    color: colors.light,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: fontSize.medium,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    color: colors.dark,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.gray1,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    fontSize: fontSize.small,
    fontWeight: "600",
    color: colors.dark,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.gray2,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableCell: {
    fontSize: fontSize.small,
    color: colors.dark,
  },
  footer: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  closeButton: {
    backgroundColor: colors.gray2,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeText: {
    fontSize: fontSize.normal,
    fontWeight: "500",
    color: colors.dark,
  },
});

export default styles;
