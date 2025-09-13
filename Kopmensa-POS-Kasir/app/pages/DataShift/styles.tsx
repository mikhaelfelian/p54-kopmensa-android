import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/constants/constants";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
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
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#f1f1f1",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  headerText: {
    flex: 1,
    fontWeight: "700",
    fontSize: 12,
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeOpen: {
    backgroundColor: "#4CAF50",
  },
  badgeClosed: {
    backgroundColor: "#FFC107",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 6,
  },
  actionBtn: {
    padding: 6,
    borderRadius: 4,
  },
});

export default styles;
