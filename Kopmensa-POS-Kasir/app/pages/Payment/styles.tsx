import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addressSection: {
    marginBottom: 20,
  },
  addressText: {
    fontSize: 16,
    color: "#888",
  },
  addressDetail: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addressSubDetail: {
    fontSize: 14,
    color: "#666",
  },
  productSection: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  shippingButton: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  shippingButtonText: {
    fontSize: 16,
    color: "#333",
  },
  promoButton: {
    backgroundColor: "#e0ffd4",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  promoText: {
    fontSize: 16,
    color: "#388E3C",
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
  },
  totalPrice: {
    fontSize: 14,
    color: "#888",
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  paymentButton: {
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 5,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
