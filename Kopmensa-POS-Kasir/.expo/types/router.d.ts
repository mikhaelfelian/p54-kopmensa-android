/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/(tabs)/bottom-tab` | `/(tabs)/drawer-navigator` | `/_sitemap` | `/bottom-tab` | `/drawer-navigator` | `/navigators/main-navigator` | `/pages/Cash` | `/pages/Cash/styles` | `/pages/Cashier` | `/pages/Cashier/styles` | `/pages/Goods` | `/pages/Goods/styles` | `/pages/Invoice` | `/pages/Invoice/styles` | `/pages/Login` | `/pages/Login/styles` | `/pages/Payment` | `/pages/Payment/styles` | `/pages/Profile` | `/pages/Profile/styles` | `/pages/Recap` | `/pages/Recap/styles` | `/pages/SplashScreen` | `/pages/SplashScreen/styles` | `/pages/WebView` | `/pages/WebView/styles` | `/redux/LoadingReducer` | `/redux/store` | `/redux/types` | `/services/base` | `/services/interceptors` | `/services/inventory` | `/services/session` | `/utils/checker` | `/utils/converter` | `/utils/dates` | `/utils/generator-random-code` | `/utils/localstorage` | `/utils/navigate-global` | `/utils/qr-extractor`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
