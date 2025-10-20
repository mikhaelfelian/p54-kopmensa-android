import { colors, fontSize } from "@/constants/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 16,
  },
  infoWrapper: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoBlock: {
    flex: 1,
    paddingRight: 16,
  },
  infoLabel: {
    fontSize: fontSize.small,
    color: colors.gray4,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: fontSize.normal,
    color: colors.dark,
    fontWeight: "600",
  },
  badgeRefund: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.teal,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  badgeRefundText: {
    fontSize: fontSize.tiny,
    color: colors.light,
    fontWeight: "600",
  },
  badgeStatus: {
    backgroundColor: colors.green,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  badgeStatusText: {
    fontSize: fontSize.tiny,
    color: colors.light,
    fontWeight: "600",
  },

  // Detail section
  detailCard: {
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 8,
    overflow: "hidden",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  detailHeaderText: {
    fontSize: fontSize.normal,
    fontWeight: "bold",
    color: colors.dark,
  },
  tableWrapper: {
    marginTop: 0,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  headerText: {
    color: colors.light,
    fontSize: fontSize.small,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  cellText: {
    fontSize: fontSize.small,
    color: colors.dark,
  },
  cellTextBold: {
    fontSize: fontSize.small,
    fontWeight: "bold",
    color: colors.dark,
  },
  badgeSmall: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  badgeSmallText: {
    fontSize: fontSize.tiny,
    color: colors.light,
    fontWeight: "600",
    backgroundColor: colors.teal,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});

export default styles;
