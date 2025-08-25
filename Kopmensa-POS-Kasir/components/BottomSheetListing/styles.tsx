import { colors } from "@/constants/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: 25,
    height: "93%",
  },
  bsTitle: {
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "center",
    marginBottom: 8,
  },
  searchFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.blue1,
    fontSize: 12,
    borderRadius: 6,
  },
  searchField: {
    marginVertical: 10,
    marginLeft: 10,
    flex: 1,
    fontSize: 12,
  },
  bsItemLabel: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.blue1,
  },
  descriptionText: {
    flex: 2,
    fontWeight: "400",
    fontSize: 12,
  },
});

export default styles;
