import { createSlice } from "@reduxjs/toolkit";
import { productReducers } from "store/reducers/products";
import { getProducts } from "store/thunks/products";
import { NetworkError } from "types/network";
import { Filter, Product, Filters } from "types/product";

export type ProductsState = {
  products: Product[];
  filters: Filter[];
  selectedFilters: Filters;
  error: NetworkError | undefined;
  hasError: boolean;
  loading: boolean;
};

const initialState = {
  products: [] as Product[],
  filters: [] as Filter[],
  selectedFilters: {
    brands: [],
    collections: [],
    categories: [],
  } as Filters,
  error: {},
  hasError: false,
  loading: false,
} as ProductsState;

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: productReducers,

  // EXTRA REDUCERS
  extraReducers: (builder) => {
    builder.addCase(
      getProducts.fulfilled,
      (state, { payload: { products, filter } }) => {
        state.products = products;
        state.filters = filter;
      }
    );

    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    // MATCHERS
    builder.addMatcher(
      (action) => action.type.endsWith("getProducts/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getProducts/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
  },
});

export const { toggleFilter } = productsSlice.actions;
export default productsSlice.reducer;
