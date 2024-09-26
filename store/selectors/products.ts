import { RootState } from "store";

export const selectProducts = (state: RootState) => state?.products?.products;
export const selectProductsLoading = (state: RootState) =>
  state?.products?.loading;
