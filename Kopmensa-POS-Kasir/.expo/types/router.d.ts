/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/(tabs)/bottom-tab` | `/(tabs)/drawer-navigator` | `/_sitemap` | `/bottom-tab` | `/drawer-navigator` | `/models copy\outlet` | `/models copy\product` | `/models copy\product-category` | `/models copy\profile` | `/models copy\transaction` | `/models/outlet` | `/models\profile` | `/navigators/main-navigator` | `/pages/Cash` | `/pages/Cash/styles` | `/pages/Cashier` | `/pages/Cashier/styles` | `/pages/Dashboard` | `/pages/Dashboard/styles` | `/pages/Goods` | `/pages/Goods/styles` | `/pages/Invoice` | `/pages/Invoice/styles` | `/pages/Login` | `/pages/Login/styles` | `/pages/Payment` | `/pages/Payment/styles` | `/pages/Profile` | `/pages/Profile/styles` | `/pages/Recap` | `/pages/Recap/styles` | `/pages/SplashScreen` | `/pages/SplashScreen/styles` | `/pages/WebView` | `/pages/WebView/styles` | `/pages\Category copy\` | `/pages\Category copy\styles` | `/pages\Category\` | `/pages\Category\styles` | `/pages\Item copy\` | `/pages\Item copy\styles` | `/pages\Item\` | `/pages\Item\styles` | `/pages\Merk copy\` | `/pages\Merk copy\Merk\` | `/pages\Merk copy\Merk\Merk\` | `/pages\Merk copy\Merk\Merk\styles` | `/pages\Merk copy\Merk\styles` | `/pages\Merk copy\styles` | `/pages\Merk\` | `/pages\Merk\styles` | `/pages\Profile copy\` | `/pages\Profile copy\styles` | `/pages\Unit\` | `/pages\Unit\styles` | `/pages\Variant copy\` | `/pages\Variant copy\styles` | `/pages\Variant\` | `/pages\Variant\styles` | `/redux/LoadingReducer` | `/redux/store` | `/redux/types` | `/services/base` | `/services/interceptors` | `/services/inventory` | `/services/session` | `/utils/checker` | `/utils/converter` | `/utils/dates` | `/utils/generator-random-code` | `/utils/localstorage` | `/utils/navigate-global` | `/utils/qr-extractor`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
