import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OutletItem, SelectedOutletState } from "@/app/models/outlet";

const initialState: SelectedOutletState = {
  selected: null,
};

const selectedOutletSlice = createSlice({
  name: "selectedOutlet",
  initialState,
  reducers: {
    setSelectedOutlet: (state, action: PayloadAction<OutletItem>) => {
      state.selected = action.payload;
    },
    clearSelectedOutlet: (state) => {
      state.selected = null;
    },
  },
});

export const { setSelectedOutlet, clearSelectedOutlet } =
  selectedOutletSlice.actions;

export default selectedOutletSlice.reducer;
