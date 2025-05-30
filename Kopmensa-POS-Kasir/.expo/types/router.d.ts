/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/_sitemap` | `/navigators/main-navigator` | `/pages/Home` | `/pages/Home/styles` | `/pages/Login` | `/pages/Login/styles` | `/pages/Payment` | `/pages/Payment/styles` | `/pages/Profile` | `/pages/Profile/styles` | `/pages/SplashScreen` | `/pages/SplashScreen/styles` | `/services/base` | `/services/interceptors` | `/services/session` | `/utils/checker` | `/utils/dates` | `/utils/generator-random-code` | `/utils/localstorage` | `/utils/qr-extractor`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
