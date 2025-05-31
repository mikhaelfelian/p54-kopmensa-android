import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#0059A9",
    paddingVertical: 2,

    borderRadius: 30,
    alignSelf: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
