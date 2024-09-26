import { createAsyncThunk } from "@reduxjs/toolkit";
import { components } from "generatedTypes";
import { itemsAreOnlyBundles } from "helpers/selection";
import ReactPixel from "react-facebook-pixel";
import {
  addItemToCartAsync,
  deleteQuantityAsync,
  getCartAsync,
  setQuantityAsync,
} from "store/transfers/cartApi";
import { NetworkError } from "types/network";

import { fbPixelAddToCart } from "components/MetaPixel/MetaPixel";

import {
  addOrderToCartAsync,
  removeItemFromSelectionAsync,
} from "./../transfers/cartApi";
import { removeAllVouchers } from "./selection";

interface params {
  filters: object;
}

export const getCartItems = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  Partial<params>,
  {
    rejectValue: NetworkError;
  }
>(
  "cart/getCartItems",
  async (cartItemsData: Partial<params>, { rejectWithValue }) => {
    try {
      const response = await getCartAsync(cartItemsData);
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

interface addItemToCartquantityType {
  itemId?: string;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  addItemToCartquantityType,
  {
    rejectValue: NetworkError;
  }
>("cart/addItemToCart", async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const response = await addItemToCartAsync(itemId, quantity);
    fbPixelAddToCart();
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

export const addOrderToCart = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  | components["schemas"]["OrderCompleteModel"]
  | components["schemas"]["OrderModel"],
  {
    rejectValue: NetworkError;
  }
>("cart/addOrderToCart", async (order, { rejectWithValue }) => {
  try {
    const response = await addOrderToCartAsync(order);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

interface quantityType {
  line?: string;
  quantity?: number;
  callback?: (timeoutId?: NodeJS.Timeout) => void;
  timeoutId?: NodeJS.Timeout;
}

export const increaseQuantityOfItem = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  quantityType,
  {
    rejectValue: NetworkError;
  }
>(
  "cart/increaseQuantity",
  async ({ line, quantity, callback, timeoutId }, { rejectWithValue }) => {
    try {
      const response = await setQuantityAsync(line, quantity);
      if (callback) callback(timeoutId);
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

export const decreaseQuantityOfItem = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  quantityType,
  {
    rejectValue: NetworkError;
  }
>(
  "cart/decreaseQuantity",
  async (
    { line, quantity, callback, timeoutId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      let response;
      if ((quantity as number) > 0) {
        response = await setQuantityAsync(line, quantity);
      } else {
        response = await deleteQuantityAsync(line);
        const hasOnlyBundles = itemsAreOnlyBundles(response.selection?.items);
        if (hasOnlyBundles) dispatch(removeAllVouchers());
      }
      if (callback) callback(timeoutId);
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

export const removeItemFromSelection = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  string,
  {
    rejectValue: NetworkError;
  }
>("cart/removeItemFromSelection", async (line: string, { rejectWithValue }) => {
  try {
    const response = await removeItemFromSelectionAsync(line);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});
