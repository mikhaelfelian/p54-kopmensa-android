import { StyleSheet } from "react-native";
import { colors } from "@/constants/constants";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray10, padding: 10 },

  // Top summary cards
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  summaryCard: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryNumber: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  summaryLabel: { color: "#fff", fontSize: 12, flex: 1, marginHorizontal: 6 },

  // Main + Sidebar
  mainRow: { flexDirection: "row" },
  leftContent: { flex: 3, marginRight: 8 },
  sidebar: { flex: 1 },

  // Search row
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, flexWrap: "wrap" },
  searchInput: { flex: 2, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginRight: 6, backgroundColor: "#fff" },
  dropdown: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, backgroundColor: "#fff", marginRight: 6 },
  dateInput: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginRight: 6, backgroundColor: "#fff" },
  searchBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 8, borderRadius: 6, marginRight: 6 },
  searchBtnText: { color: "#fff", marginLeft: 4 },
  resetBtn: { backgroundColor: "#eee", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginRight: 6 },
  resetText: { color: "#333" },
  addTransBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 8, borderRadius: 6 },
  addTransText: { color: "#fff", marginLeft: 4 },

  // Table
  tableCard: { backgroundColor: "#fff", borderRadius: 8, elevation: 2, overflow: "hidden" },
  tableRowHeader: { flexDirection: "row", backgroundColor: "#f9f9f9", borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: 8 },
  tableHead: { fontWeight: "bold", fontSize: 12, textAlign: "center" },
  tableRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" },

  // Column width ratios
  colNo: { flex: 0.5, alignItems: "center", justifyContent: "center" },
  colNota: { flex: 2, paddingHorizontal: 6, alignItems: "flex-start" },
  colPelanggan: { flex: 1.2, alignItems: "flex-start", justifyContent: "center" },
  colTotal: { flex: 1, alignItems: "flex-start", justifyContent: "center" },
  colStatus: { flex: 1, alignItems: "flex-start", justifyContent: "center" },
  colStatusBayar: { flex: 1.2, alignItems: "flex-start", justifyContent: "center" },
  colAksi: { flex: 1.5, alignItems: "flex-start", justifyContent: "center" },

  boldText: { fontWeight: "bold", fontSize: 12 },
  subText: { fontSize: 10, color: "#555" },

  badgeWrapper: { alignItems: "center", justifyContent: "center" },
  badge: { color: "#fff", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, fontSize: 10, overflow: "hidden", textAlign: "center" },

  actionGroup: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  actionBtn: { padding: 6, borderRadius: 6, marginHorizontal: 2, alignItems: "center", justifyContent: "center" },

  // Sidebar
  quickActions: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 },
  quickTitle: { fontWeight: "600", marginBottom: 8 },
  quickBtn: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 6, marginBottom: 8 },
  quickText: { color: "#fff", fontWeight: "600", marginLeft: 6 },

  latestCard: { backgroundColor: "#fff", padding: 12, borderRadius: 8 },
  latestTitle: { fontWeight: "600", marginBottom: 8 },
  latestRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
});

export default styles;
