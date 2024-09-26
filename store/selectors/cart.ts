import { RootState } from "store";

export const selectCart = (state: RootState) => state.cart;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartItems = (state: RootState) =>
  state.cart.selection?.items;
export const selectCartOpen = (state: RootState) => state.cart.open;
export const selectCartCheckoutScript = (state: RootState) =>
  state.cart.selection?.centraCheckoutScript;
