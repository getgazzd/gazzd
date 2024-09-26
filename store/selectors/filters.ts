import { RootState } from "store";

export const selectFilters = (state: RootState) => state.products.filters;

export const selectSelectedFilters = (state: RootState) =>
  state.products.selectedFilters;
