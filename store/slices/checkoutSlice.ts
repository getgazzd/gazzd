import { createSlice } from "@reduxjs/toolkit";
import {
  createPayment,
  getAddressFromIdentity,
  getPaymentResult,
} from "store/thunks/checkout";
import { NetworkError } from "types/network";
import { PaymentResponse } from "types/payment";
import { getPaymentResultAsync } from "store/transfers/checkout";
import { Address } from "types";

export type checkoutState = {
  payment?: PaymentResponse;
  paymentResult: {};
  address: Address;
  error: NetworkError | undefined;
  hasError: boolean;
  loading: boolean;
};

const initialState = {
  payment: undefined,
  paymentResult: {},
  address: {},
  error: {},
  hasError: false,
  loading: true,
} as checkoutState;

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    startCheckoutLoading(state) {
      state.loading = true;
    },
  },

  // EXTRA REDUCERS
  extraReducers: (builder) => {
    builder.addCase(getAddressFromIdentity.fulfilled, (state, { payload }) => {
      state.address = payload.address;
    });

    builder.addCase(getAddressFromIdentity.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    builder.addCase(createPayment.fulfilled, (state, { payload }) => {
      state.payment = payload;
    });

    builder.addCase(createPayment.rejected, (state, { payload }) => {
      state.hasError = true;
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(getPaymentResult.fulfilled, (state, { payload }) => {
      state.paymentResult = payload;
    });

    builder.addCase(getPaymentResult.rejected, (state, { payload }) => {
      state.hasError = true;
      state.loading = false;
      state.error = payload as NetworkError;
    });

    // MATCHERS
    builder.addMatcher(
      (action) => action.type.endsWith("checkout/createPayment/pending"),
      (state) => {
        state.loading = true;
        state.payment = undefined;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("checkout/createPayment/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("checkout/getPaymentResult/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("checkout/getPaymentResult/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
  },
});

export const { startCheckoutLoading } = checkoutSlice.actions;
export default checkoutSlice.reducer;
