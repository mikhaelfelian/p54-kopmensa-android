/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/(tabs)/drawer-navigator` | `/_sitemap` | `/drawer-navigator` | `/models/basic-metric` | `/models/cart` | `/models/outlet` | `/models/payment` | `/models/product` | `/models/product-category` | `/models/profile` | `/models/recent-transaction` | `/models/return` | `/models/sales-by-category` | `/models/sales-monthly-target` | `/models/shift` | `/models/top-product` | `/models/transaction` | `/navigators/main-navigator` | `/pages/Cashier` | `/pages/Cashier/styles` | `/pages/CloseShift` | `/pages/CloseShift/styles` | `/pages/Dashboard` | `/pages/Dashboard/styles` | `/pages/DataReturn` | `/pages/DataReturn/styles` | `/pages/DataReturnDetail` | `/pages/DataReturnDetail/styles` | `/pages/DataSales` | `/pages/DataSales/styles` | `/pages/DataSalesCashier` | `/pages/DataSalesCashier/styles` | `/pages/DataShift` | `/pages/DataShift/styles` | `/pages/DetailShift` | `/pages/DetailShift/styles` | `/pages/ExchangeGoods` | `/pages/ExchangeGoods/styles` | `/pages/Login` | `/pages/Login/styles` | `/pages/OpenShift` | `/pages/OpenShift/styles` | `/pages/PettyCash` | `/pages/PettyCash/styles` | `/pages/PettyCashCategory` | `/pages/PettyCashCategory/styles` | `/pages/ReturnFunds` | `/pages/ReturnFunds/styles` | `/pages/SaleInputScreen` | `/pages/SaleInputScreen/styles` | `/pages/SplashScreen` | `/pages/SplashScreen/styles` | `/pages/WebView` | `/pages/WebView/styles` | `/redux/CartReducer` | `/redux/LoadingReducer` | `/redux/OutletReducer` | `/redux/store` | `/redux/types` | `/services/base` | `/services/interceptors` | `/services/inventory` | `/services/sales` | `/services/session` | `/services/shift` | `/utils/checker` | `/utils/converter` | `/utils/currency` | `/utils/dates` | `/utils/generator-random-code` | `/utils/localstorage` | `/utils/navigate-global` | `/utils/print` | `/utils/qr-extractor`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
