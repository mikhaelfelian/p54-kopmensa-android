import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../types";

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
