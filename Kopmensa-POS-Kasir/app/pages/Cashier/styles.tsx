import { colors } from "@/constants/constants";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 0.1,
    backgroundColor: colors.light,
    elevation: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productImageContainer: {
    width: width * 0.07,
    aspectRatio: 1,
  },
  searchFieldContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.gray5,
    fontSize: 12,
    borderRadius: 5,
  },
  searchField: {
    marginVertical: 10,
    marginLeft: 10,
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
  },
  categoryWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: colors.gray4,
    elevation: 3,
    backgroundColor: colors.light,
  },
  outletDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.gray1,
  },
  modeToggle: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  modeButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.light,
  },
  modeActiveBlue: { backgroundColor: colors.primary },
  modeActiveGreen: { backgroundColor: colors.green },
  modeText: { fontSize: 14, fontWeight: "600", color: colors.dark },
  modeTextActive: { color: colors.light },

  qrSection: { marginVertical: 10 },
  qrInputWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  qrInput: { flex: 1, paddingHorizontal: 10, fontSize: 12 },
  qrIcon: { padding: 8 },

  cartBox: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 5,
    overflow: "hidden",
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.gray7,
    padding: 10,
  },
  cartBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  cartBadgeText: { color: colors.light, marginRight: 4, fontSize: 12 },
  cartEmpty: {
    alignItems: "center",
    padding: 20,
  },
  cartSummary: { padding: 10 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  payButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: { color: colors.light, marginLeft: 6, fontWeight: "700" },
  draftButton: {
    backgroundColor: colors.teal,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  draftButtonText: { color: colors.light, marginLeft: 6, fontWeight: "700" },
  centerVerticalText: {
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    color: "gray",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
