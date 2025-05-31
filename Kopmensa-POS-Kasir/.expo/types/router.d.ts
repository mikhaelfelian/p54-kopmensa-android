/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/bottom-tab` | `/(tabs)\drawer-navigator` | `/..\constants\label-styles` | `/_sitemap` | `/bottom-tab` | `/navigators/main-navigator` | `/pages/Home` | `/pages/Home/styles` | `/pages/Login` | `/pages/Login/styles` | `/pages/Payment` | `/pages/Payment/styles` | `/pages/Profile` | `/pages/Profile/styles` | `/pages/SplashScreen` | `/pages/SplashScreen/styles` | `/pages\Cash copy\` | `/pages\Cash copy\styles` | `/pages\Cash\` | `/pages\Cash\styles` | `/pages\Cashier copy\styles` | `/pages\Cashier\` | `/pages\Cashier\styles` | `/pages\Goods copy\` | `/pages\Goods copy\styles` | `/pages\Goods\` | `/pages\Goods\styles` | `/pages\Invoice\` | `/pages\Invoice\styles` | `/pages\Recap\` | `/pages\Recap\styles` | `/redux/LoadingReducer` | `/redux/store` | `/redux/types` | `/services/base` | `/services/interceptors` | `/services/session` | `/utils/checker` | `/utils/dates` | `/utils/generator-random-code` | `/utils/localstorage` | `/utils/qr-extractor`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
