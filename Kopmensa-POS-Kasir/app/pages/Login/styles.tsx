import { StyleSheet, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: "55%",
    height: "15%",
    alignSelf: "center",
    marginBottom: 80,
  },
  button: {
    backgroundColor: "#78A7C3",
    paddingVertical: 3,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    marginTop: 16,
    textAlign: "center",
    color: "#6200ee",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
  },
  outletWrapper: {
    borderWidth: 0.7,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
