import { colors, fontSize } from "@/constants/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.dark,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerText: {
    color: colors.light,
    fontSize: fontSize.small,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  cellText: {
    fontSize: fontSize.small,
    color: colors.dark,
  },
  badge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginHorizontal: 4,
  },
  badgeText: {
    fontSize: fontSize.tiny,
    fontWeight: "bold",
  },
  actionBtn: {
    flex: 0.8,
    backgroundColor: colors.blue3,
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default styles;
