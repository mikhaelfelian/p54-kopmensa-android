import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 20,
  },
  image: {
    width: "40%",
    height: "35%",
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "#000",
  },
  appTitleStyle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
  },
  appVersionStyle: {
    fontSize: 13,
    color: "#000",
  },
});

export default styles;
