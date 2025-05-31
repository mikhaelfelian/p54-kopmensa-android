import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import "react-native-reanimated";
import MainStackNavigator from "./navigators/main-navigator";
import { StatusBar } from "react-native";
import { Provider, useSelector } from "react-redux";
import LoadingScreen from "@/components/LoadingScreen";
import { store } from "./redux/store";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import * as Font from "expo-font";

export default function RootLayout() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
      });
    }

    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <NavigationContainer theme={DefaultTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <MainStackNavigator />
      <LoadingScreen visible={isLoading} />
    </NavigationContainer>
  );
};
