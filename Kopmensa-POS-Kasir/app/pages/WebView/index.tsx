import React, { useRef } from "react";
import { Dimensions, Linking, View, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./styles";
import RNPrint from "react-native-print";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WebViewScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");
  const webviewRef = useRef(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <WebView
        showsVerticalScrollIndicator={false}
        ref={webviewRef}
        source={{ uri: "https://dev.kopmensa.com/auth/login-kasir" }}
        style={{
          width: width,
          height: height,
        }}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        injectedJavaScript={`
          (function() {
            window.open = function(url) {
              window.location.href = url;
            };

            window.close = function() {
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage("close-print-page");
              }
            };

            document.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width=1024');

            window.getCleanPrintableHTML = function() {
              const docClone = document.documentElement.cloneNode(true);
              Array.from(docClone.querySelectorAll('button')).forEach(btn => btn.remove());
              return '<!DOCTYPE html>' + docClone.outerHTML;
            };

            const hijackPrintButtons = () => {
              document.querySelectorAll('button').forEach(btn => {
                const label = btn.innerText.toLowerCase();
                if (label.includes('print to dot matrix') || label.includes('print pdf')) {
                  btn.onclick = function(e) {
                    e.preventDefault();
                    const html = window.getCleanPrintableHTML();
                    let printType = 'pdf';
                    if (btn.innerText.toLowerCase().includes('dot matrix')) {
                      printType = 'dotMatrix';
                    }
                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "html", content: html, printType }));
                  };
                }
              });
            };

            hijackPrintButtons();
            setTimeout(hijackPrintButtons, 1000);
            setTimeout(hijackPrintButtons, 2000);
            setTimeout(hijackPrintButtons, 3000);

            true;
          })()
        `}
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url;

          console.log("Navigating to:", url);

          return true;
        }}
        onMessage={async (event) => {
          const msg = event.nativeEvent.data;
          console.log("Received message from WebView:", msg);

          if (msg === "close-print-page") {
            if (webviewRef.current) {
              (webviewRef.current as any).goBack();
            }
            return;
          }

          if (msg === "error:no-clean-html") {
            Alert.alert("Error", "Printable content not available on this page.");
            return;
          }

          try {
            const data = JSON.parse(msg);
            if (data.type === "html") {
              await RNPrint.print({ html: data.content });
            }
          } catch (err) {
            console.error("Failed to parse print data:", err);
          }
        }}
      />
    </View>
  );
};

export default WebViewScreen;
