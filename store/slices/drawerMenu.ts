import { createSlice } from "@reduxjs/toolkit";
import { NetworkError } from "types/network";

export type DrawerMenuState = {
  open: boolean;
  error: NetworkError | undefined;
  hasError: boolean;
  loading: boolean;
};

const initialState = {
  open: false,
  error: {},
  hasError: false,
  loading: true,
} as DrawerMenuState;

export const drawerMenuSlice = createSlice({
  name: "drawerMenu",
  initialState: initialState,
  reducers: {
    drawerMenuOpen(state) {
      state.open = true;
    },
    closeDrawerMenu(state) {
      state.open = false;
    },
  },

  // EXTRA REDUCERS
});

export const { drawerMenuOpen, closeDrawerMenu } = drawerMenuSlice.actions;
export default drawerMenuSlice.reducer;
