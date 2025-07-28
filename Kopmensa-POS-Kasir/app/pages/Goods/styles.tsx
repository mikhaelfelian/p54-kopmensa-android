import { colors } from "@/constants/constants";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: colors.light,
  },
  leftPanel: {
    flex: 1,
    padding: 10,
  },
  rightPanel: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eaeaea",
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#c4c4c4",
    borderRadius: 5,
    marginRight: 10,
  },
  itemName: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
  },
  stockBadge: {
    backgroundColor: "#d4f3dc",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 4,
  },
  stockText: {
    color: "green",
    fontSize: 10,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "right",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  pageButton: {
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 2,
  },
  activePage: {
    backgroundColor: "#1d70b8",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  instructionBox: {
    backgroundColor: "#d8f0d3",
    padding: 12,
    borderRadius: 8,
  },
  instructionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: "#7ac66f",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  eraseBtnContainer: {
    backgroundColor: colors.gray1,
    borderRadius: width * 0.02 * 2,
    justifyContent: "center",
    padding: 5,
  },
  editStockButton: {
    backgroundColor: colors.green2,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export default styles;
