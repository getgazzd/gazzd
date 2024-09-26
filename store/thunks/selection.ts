import { createAsyncThunk } from "@reduxjs/toolkit";
import { components, paths } from "generatedTypes";
import { RootState } from "store";
import { selectVouchers } from "store/selectors/selection";
import { startCheckoutLoading } from "store/slices/checkoutSlice";
import {
  addVoucherAsync,
  addVoucherCentraAsync,
  getSelectionAsync,
  initCheckoutAsync,
  removeVoucherAsync,
  switchSelectionAsync,
  updateCountryAsync,
  updatePaymentFieldsAsync,
  updateSelectionAsync,
  updateShippingMethodAsync,
} from "store/transfers/selection";
import { CentraNetworkError, NetworkError } from "types/network";

import { getCartItems } from "./cart";
import { createPayment } from "./checkout";

// Fetches User information from Centra
export const getSelection = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  undefined,
  {
    rejectValue: NetworkError;
  }
>("selection/getSelection", async (_, { rejectWithValue }) => {
  try {
    const response = await getSelectionAsync();
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

export const updateSelection = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  any,
  {
    rejectValue: NetworkError;
  }
>("selection/updateSelection", async (args, { rejectWithValue }) => {
  try {
    const response = await updateSelectionAsync(args);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

export const switchSelection = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  { selection: string; callback: () => void },
  {
    rejectValue: NetworkError;
  }
>(
  "selection/switchSelection",
  async ({ selection, callback }, { rejectWithValue }) => {
    try {
      const response = await switchSelectionAsync(selection);
      callback();
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

export type PaymentFieldArgs = {
  shippingAddress: {
    email: string;
  };
  cartAbandonmentEmail: boolean;
  callback?: () => void;
};

export const updatePaymentFields = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  PaymentFieldArgs,
  {
    rejectValue: NetworkError;
  }
>(
  "selection/updatePaymentFields",
  async (
    { shippingAddress, cartAbandonmentEmail, callback },
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePaymentFieldsAsync({
        shippingAddress,
        cartAbandonmentEmail,
      });
      if (callback) callback();
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

export const updateCountry = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  string | undefined,
  {
    rejectValue: NetworkError;
  }
>("selection/updateCountry", async (country, { rejectWithValue }) => {
  try {
    const response = await updateCountryAsync(country);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

type RemoveVoucherProps = string;
export const removeVoucher = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  RemoveVoucherProps,
  {
    rejectValue: NetworkError;
  }
>("selection/removeVoucher", async (voucher, { rejectWithValue, dispatch }) => {
  try {
    dispatch(startCheckoutLoading());
    const response = await removeVoucherAsync(voucher);
    dispatch(getCartItems({}));
    dispatch(createPayment());
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

export const removeAllVouchers = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  undefined,
  {
    rejectValue: NetworkError;
  }
>(
  "selection/removeAllVouchers",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(startCheckoutLoading());
      const state = getState();
      const addedVouchers = selectVouchers(state as RootState);
      const promises = addedVouchers?.map((voucher) => {
        return removeVoucherAsync(voucher.voucher as string);
      });
      const results = await Promise.all(promises ?? []);
      dispatch(getCartItems({}));
      dispatch(createPayment());
      return results[results.length - 1];
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

export const initCheckout = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  undefined,
  {
    rejectValue: NetworkError;
  }
>("selection/initCheckout", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await initCheckoutAsync();
    dispatch(createPayment());
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

export const addVoucher = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  string,
  {
    rejectValue: NetworkError;
  }
>("selection/addVoucher", async (voucher, { rejectWithValue, dispatch }) => {
  dispatch(startCheckoutLoading());
  try {
    const data = await addVoucherCentraAsync(voucher);
    dispatch(getCartItems({}));
    dispatch(createPayment());
    return data;
  } catch (error) {
    return rejectWithValue(error as CentraNetworkError);
  }
});

export const updateShippingMethod = createAsyncThunk<
  components["schemas"]["SelectionResponse"],
  { shippingMethod: string },
  {
    rejectValue: NetworkError;
  }
>(
  "selection/updateShippingMethod",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startCheckoutLoading());
      const response = await updateShippingMethodAsync(args);
      dispatch(getCartItems({}));
      dispatch(createPayment());
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);
