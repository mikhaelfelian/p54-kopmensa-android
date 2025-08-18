import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect } from "react";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";
import { navigationRef } from "@/app/utils/navigate-global";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/constants";
import MainStackNavigator from "./app/navigators/main-navigator";
import { RootState, store } from "./app/redux/store";

export default function AppContent() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
      });
    }

    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar translucent={false} backgroundColor={colors.dark} style="light" />
      <App />
    </Provider>
  );
}

const App = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator />
      <LoadingScreen visible={isLoading} />
      <Toast />
    </NavigationContainer>
  );
};
