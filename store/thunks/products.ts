import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAsync,
  getProductsByCategoryAsync,
} from "store/transfers/productApi";
import { NetworkError } from "types/network";
import {
  Filter,
  Product,
  ProductParams,
  ProductsResponse,
} from "types/product";

interface MergedProductResponse {
  products: Product[];
  filter: Filter[];
}
export const getProducts = createAsyncThunk<
  MergedProductResponse,
  Partial<ProductParams> | string,
  {
    rejectValue: NetworkError;
  }
>(
  "products/getProducts",
  async (
    productsData: Partial<ProductParams> | string,
    { rejectWithValue }
  ) => {
    try {
      if (typeof productsData === "string") {
        const products = await getProductsByCategoryAsync(productsData);
        return products;
      }
      const products = await getProductsAsync(productsData);
      return products;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);
