import { StyleSheet } from "react-native";
import { colors } from "@/constants/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 12,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterBox: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterTitle: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchBox: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
  },
  dropdown: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  filterBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  filterBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetBtn: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  resetBtnText: {
    color: "#333",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 13,
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerCell: {
    fontWeight: "bold",
    paddingHorizontal: 4,
    fontSize: 13,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  cell: {
    paddingHorizontal: 4,
    fontSize: 13,
  },
  badge: {
    backgroundColor: "green",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
  },
  editBtn: {
    backgroundColor: "#f0ad4e",
    padding: 6,
    borderRadius: 4,
    marginRight: 6,
  },
  deleteBtn: {
    backgroundColor: "#d9534f",
    padding: 6,
    borderRadius: 4,
  },
  statusWrapper: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centerVerticalText: {
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});

export default styles;
