import { colors } from "@/constants/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 6,
    width: "92%",
    padding: 16,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
  },
  summaryTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    width: 60,
    marginHorizontal: 6,
    borderRadius: 4,
    textAlign: "right",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
    borderRadius: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  platformBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginLeft: 6,
    textAlign: "right",
    paddingHorizontal: 14,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginLeft: 6,
  },
  addButton: {
    marginTop: 6,
  },
  totalBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginTop: 12,
  },
  totalLabel: {
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeBtn: {
    backgroundColor: "gray",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
});

export default styles;
