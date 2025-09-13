import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray10,
    padding: 10,
  },
  row: { flexDirection: "row", marginBottom: 10 },
  cardLeft: {
    flex: 2,
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  cardRight: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  cardFull: {
    backgroundColor: colors.light,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardTitle: { fontSize: fontSize.normal, fontWeight: "600" },

  // Info section
  infoRow: { flexDirection: "row", marginBottom: 6, flexWrap: "wrap" },
  infoLabel: { fontWeight: "600", width: "25%" },
  infoValue: { width: "25%" },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: fontSize.tiny,
    overflow: "hidden",
  },

  // Actions
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  actionText: { color: colors.light, fontWeight: "600", marginLeft: 6 },

  // Summary
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  summaryLabel: { fontSize: fontSize.tiny, marginTop: 4 },
  summaryValue: { fontWeight: "bold", fontSize: fontSize.medium },

  // Stats
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  statsCol: { flex: 1, alignItems: "center" },
  statsValue: { fontSize: fontSize.medium, fontWeight: "bold" },
  statsLabel: { fontSize: fontSize.tiny, color: colors.gray15 },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.gray9,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: colors.gray2,
  },
  tableHead: { fontWeight: "600", fontSize: fontSize.tiny, textAlign: "center" },
  tableRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.gray2,
    alignItems: "center",
  },
  emptyText: { textAlign: "center", color: colors.gray15, fontSize: fontSize.small },

  // Link
  linkBtn: { marginLeft: "auto" },
  linkText: { color: colors.blue2, fontWeight: "600" },
});

export default styles;
