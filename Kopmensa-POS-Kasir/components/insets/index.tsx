import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const insetsBottomNav = () => {
  const insets = useSafeAreaInsets();
  const is3ButtonNavActive = Platform.OS === "android" && insets.bottom > 0;

  return is3ButtonNavActive ? insets.bottom : 0;
};
