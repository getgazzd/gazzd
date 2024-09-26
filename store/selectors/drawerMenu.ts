import { RootState } from "store";

export const selectDrawerMenu = (state: RootState) => state.drawerMenu;
export const selectDrawerMenuLoading = (state: RootState) =>
  state.drawerMenu.loading;
export const selectDrawerMenuOpen = (state: RootState) => state.drawerMenu.open;
