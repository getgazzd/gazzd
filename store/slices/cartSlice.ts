import { createSlice } from "@reduxjs/toolkit";
import { components } from "generatedTypes";
import { AppDispatch } from "store";
import { NetworkError } from "types/network";

import {
  addItemToCart,
  addOrderToCart,
  decreaseQuantityOfItem,
  getCartItems,
  increaseQuantityOfItem,
  removeItemFromSelection,
} from "./../thunks/cart";

export type CartState = {
  selection: components["schemas"]["SelectionResponse"]["selection"];
  open: boolean;
  error: NetworkError | undefined;
  hasError: boolean;
  loading: boolean;
};

const initialState = {
  selection: {},
  open: false,
  error: {},
  hasError: false,
  loading: true,
} as CartState;

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    _openCart(state) {
      state.open = true;
    },
    closeCart(state) {
      state.open = false;
    },
  },

  // EXTRA REDUCERS
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, { payload }) => {
      state.selection = payload.selection;
    });

    builder.addCase(getCartItems.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
      state.selection = payload.selection;
    });

    builder.addCase(addItemToCart.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    builder.addCase(addOrderToCart.fulfilled, (state, { payload }) => {
      state.selection = payload.selection;
    });

    builder.addCase(addOrderToCart.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    builder.addCase(increaseQuantityOfItem.fulfilled, (state, { payload }) => {
      state.selection = payload.selection;
    });

    builder.addCase(increaseQuantityOfItem.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    builder.addCase(decreaseQuantityOfItem.fulfilled, (state, { payload }) => {
      state.selection = payload.selection;
    });

    builder.addCase(decreaseQuantityOfItem.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    builder.addCase(removeItemFromSelection.fulfilled, (state, { payload }) => {
      state.selection = payload.selection;
    });

    builder.addCase(removeItemFromSelection.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error = payload;
    });

    // MATCHERS
    builder.addMatcher(
      (action) => action.type.endsWith("getCartItems/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getCartItems/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("cart/addItemToCart/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("cart/addItemToCart/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
        state.open = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("cart/addOrderToCart/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("cart/addOrderToCart/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
        state.open = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("cart/increaseQuantity/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("cart/increaseQuantity/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("cart/decreaseQuantity/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("cart/decreaseQuantity/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type.endsWith("cart/removeItemFromSelection/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
  },
});

export const openCart = () => async (dispatch: AppDispatch) => {
  dispatch(cartSlice.actions._openCart());
  return dispatch(getCartItems({}));
};

export const { _openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
