import React from "react";
import { Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const WebViewScreen: React.FC = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://pos.tigerasoft.com/pos-kasir" }}
        style={{
          width: width,
          height: height,
        }}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        injectedJavaScript={`
          document.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width=1024');
          true;
        `}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </View>
  );
};

export default WebViewScreen;
