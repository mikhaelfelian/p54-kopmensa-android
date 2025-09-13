import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/constants/constants";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 12,
  },
  topButtons: {
    flexDirection: "row",
    marginBottom: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  filterCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  filterTitle: { fontWeight: "600", marginLeft: 6 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: { fontSize: 12, marginBottom: 4, color: "#333" },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tableTitle: { fontWeight: "600", marginLeft: 6 },
  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
  },
  tableHead: {
    flex: 1,
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  badge: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    overflow: "hidden",
    textAlign: "center",
  },
  actionBtn: {
    backgroundColor: "#17a2b8",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
  },
});

export default styles;
