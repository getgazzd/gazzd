import { createSlice } from "@reduxjs/toolkit";
import { components } from "generatedTypes";
import {
  addVoucher,
  getSelection,
  initCheckout,
  removeAllVouchers,
  removeVoucher,
  switchSelection,
  updateCountry,
  updatePaymentFields,
  updateSelection,
  updateShippingMethod,
} from "store/thunks/selection";
import { NetworkError } from "types/network";

import { ToastStatus, showToast } from "components/Toast/Toast";

export type SelectionState = {
  error: NetworkError | undefined;
  hasError: boolean;
  loading: boolean;
  selection: components["schemas"]["SelectionResponse"];
  updatedMarket?: boolean;
};

const initialState = {
  error: {},
  hasError: false,
  loading: true,
  selection: {},
  updatedMarket: false,
} as SelectionState;

export const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getSelection
    builder.addCase(getSelection.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(getSelection.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });

    //updateSelection
    builder.addCase(updateSelection.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
      state.updatedMarket = true;
    });
    builder.addCase(updateSelection.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(getSelection.pending, (state, { payload }) => {
      state.loading = true;
    });

    // updateCountry
    builder.addCase(updateCountry.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(updateCountry.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(updateCountry.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(removeVoucher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeVoucher.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(removeVoucher.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(removeAllVouchers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeAllVouchers.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(removeAllVouchers.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(initCheckout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initCheckout.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(initCheckout.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(addVoucher.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
      showToast({
        message: "VOUCHER ADDED",
        status: ToastStatus.SUCCESS,
      });
    });
    builder.addCase(addVoucher.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
      showToast({
        message: "VOUCHER INVALID",
        status: ToastStatus.WARNING,
      });
    });
    builder.addCase(updateShippingMethod.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(updateShippingMethod.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(switchSelection.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(switchSelection.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    updatePaymentFields;
    builder.addCase(updatePaymentFields.fulfilled, (state, { payload }) => {
      state.selection = payload;
      state.loading = false;
    });
    builder.addCase(updatePaymentFields.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
      state.loading = false;
    });
    // MATCHERS
    builder.addMatcher(
      (action) => action.type.endsWith("updateShippingMethod/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("addVoucher/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("initCheckout/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("initCheckout/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("removeVoucher/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("removeVoucher/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getSelection/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getSelection/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("updateSelection/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("updateSelection/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
  },
});

export default selectionSlice.reducer;
