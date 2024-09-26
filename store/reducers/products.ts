import { PayloadAction } from "@reduxjs/toolkit";
import { ProductsState } from "store/slices/productsSlice";
import { FilterFields } from "types/product";

interface Payload {
  filterField: FilterFields;
  value: string;
}

export const productReducers = {
  toggleFilter: (
    { selectedFilters }: ProductsState,
    { payload: { filterField, value } }: PayloadAction<Payload>
  ) => {
    const state = selectedFilters[filterField];

    if (!state.includes(value)) {
      state.push(value);
    } else {
      const index = state.indexOf(value);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  },
};
