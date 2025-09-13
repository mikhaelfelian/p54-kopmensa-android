import { CartItem, CartState, Product } from "@/app/models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0, //totalPrice here is already with tax 11%
  tax: 0, //tax is 11%, how to get the tax?
  priceBeforeTax: 0, //how to get the price before tax?
};

const TAX_RATE = 0.11;

const calculatePriceBeforeTax = (totalPrice: number) => {
  return totalPrice / (1 + TAX_RATE);
};

const calculateTax = (totalPrice: number) => {
  return totalPrice - calculatePriceBeforeTax(totalPrice);
};

const recalculateCart = (state: CartState) => {
  state.totalPrice = calculateTotalPrice(state.items);
  state.totalItems = calculateTotalItems(state.items);
  state.priceBeforeTax = calculatePriceBeforeTax(state.totalPrice);
  state.tax = calculateTax(state.totalPrice);
};

const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.harga_jual * item.quantity, 0);
};

const calculateTotalItems = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.items.findIndex((item) => item.kode === action.payload.kode);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      recalculateCart(state);
    },

    updateCartItemQuantity: (state, action: PayloadAction<{ kode: string; quantity: number }>) => {
      const item = state.items.find((item) => item.kode === action.payload.kode);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }

      recalculateCart(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.kode !== action.payload);
      recalculateCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      recalculateCart(state);
    },
  },
});

export const { addToCart, updateCartItemQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
