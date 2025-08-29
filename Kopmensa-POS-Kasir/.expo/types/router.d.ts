/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/(tabs)/drawer-navigator` | `/_sitemap` | `/drawer-navigator` | `/models/basic-metric` | `/models/outlet` | `/models/profile` | `/models/recent-transaction` | `/models/sales-by-category` | `/models/sales-monthly-target` | `/models/top-product` | `/navigators/main-navigator` | `/pages/Category` | `/pages/Category/styles` | `/pages/Dashboard` | `/pages/Dashboard/styles` | `/pages/Item` | `/pages/Item/styles` | `/pages/Login` | `/pages/Login/styles` | `/pages/Merk` | `/pages/Merk/styles` | `/pages/SplashScreen` | `/pages/SplashScreen/styles` | `/pages/Unit` | `/pages/Unit/styles` | `/pages/Variant` | `/pages/Variant/styles` | `/pages/WebView` | `/pages/WebView/styles` | `/redux/LoadingReducer` | `/redux/store` | `/redux/types` | `/services/base` | `/services/interceptors` | `/services/inventory` | `/services/sales` | `/services/session` | `/utils/checker` | `/utils/converter` | `/utils/currency` | `/utils/dates` | `/utils/generator-random-code` | `/utils/localstorage` | `/utils/navigate-global` | `/utils/qr-extractor`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
