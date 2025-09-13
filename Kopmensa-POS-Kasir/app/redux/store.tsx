import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingReducer";
import selectedOutletReducer from "./OutletReducer";
import cartReducer from "./CartReducer";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    cart: cartReducer,
    selectedOutlet: selectedOutletReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
