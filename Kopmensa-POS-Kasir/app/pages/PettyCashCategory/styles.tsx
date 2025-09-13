import { StyleSheet } from "react-native";
import { colors } from "@/constants/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 6,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  tableHead: {
    flex: 1,
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    textAlign: "center",
    overflow: "hidden",
  },
  actionGroup: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  actionBtn: {
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    alignItems: "center",
  },
  footerText: {
    marginTop: 12,
    fontSize: 12,
    color: "#555",
    textAlign: "right",
  },
});

export default styles;
