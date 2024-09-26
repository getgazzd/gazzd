import { createSlice } from "@reduxjs/toolkit";
import { components } from "generatedTypes";
import { clearLocalStorage, isAuthenticated } from "helpers/localStorage";
import { handleCentraReject } from "store/helpers/errors";
import { resetUserState } from "store/helpers/fullfilled";
import {
  _getOrders,
  _getUser,
  _loginUser,
  _registerUser,
  _updateUser,
  getBackendUser,
  getUserEvents,
} from "store/thunks/user";
import { BackendUser, LoggedIn, UserEvent, UserStateError } from "types";

export type UserState = {
  user: LoggedIn;
  error: UserStateError;
  hasError: boolean;
  loading: boolean;
  loggedIn: boolean;
  orders: components["schemas"]["OrderModel"][];
  ordersPaging: components["schemas"]["OrdersResponse"]["ordersPaging"];
  ordersLoading: boolean;
  backendUser: BackendUser | null;
  xpLoading: boolean;
  eventsLoading: boolean;
  events: UserEvent[];
};

const initialState: UserState = {
  user: {} as LoggedIn,
  error: {
    centra: {
      firstName: undefined,
      lastName: undefined,
      password: undefined,
      email: undefined,
    },
    backend: {},
    uncaught: undefined,
  },
  hasError: false,
  loading: false,
  loggedIn: isAuthenticated(),
  orders: [],
  ordersPaging: {},
  ordersLoading: false,
  backendUser: null,
  xpLoading: false,
  eventsLoading: false,
  events: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state: UserState) => {
      clearLocalStorage();
      state = { ...initialState, loggedIn: false };
      return state;
    },
    clearErrors: (state: UserState) => {
      const newState = resetUserState(state);
      return newState;
    },
    updateBackendUser: (state: UserState, action) => {
      if (state.backendUser) {
        const { xp, level } = state.backendUser;
        if (xp !== action.payload.xp || level !== action.payload.level) {
          state.backendUser = action.payload;
        }
      }
    },
    authFailedForUser: (state: UserState) => {
      clearLocalStorage();
      state = { ...initialState, loggedIn: false };
      return state;
    },
  },

  // EXTRA REDUCERS
  extraReducers: (builder) => {
    builder.addCase(_registerUser.fulfilled, (state, { payload }) => {
      state.user = payload.loggedIn;
      state.loggedIn = true;
      resetUserState(state);
    });

    builder.addCase(_registerUser.rejected, handleCentraReject);

    builder.addCase(_loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.loggedIn;
      state.loggedIn = true;
      resetUserState(state);
    });

    builder.addCase(_loginUser.rejected, handleCentraReject);

    builder.addCase(_getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      resetUserState(state);
    });

    builder.addCase(_getUser.rejected, handleCentraReject);

    builder.addCase(_updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.loggedIn;
      resetUserState(state);
    });

    builder.addCase(_updateUser.rejected, handleCentraReject);

    builder.addCase(_getOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.orders as components["schemas"]["OrderModel"][];
      state.ordersPaging = payload.ordersPaging;
      resetUserState(state);
    });

    builder.addCase(_getOrders.rejected, handleCentraReject);

    builder.addCase(getBackendUser.fulfilled, (state, { payload }) => {
      state.backendUser = payload;
    });

    builder.addCase(getBackendUser.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error?.uncaught?.push("Something went wrong");
    });

    builder.addCase(getUserEvents.fulfilled, (state, { payload }) => {
      state.events = payload.events;
    });

    builder.addCase(getUserEvents.rejected, (state, { payload }) => {
      state.hasError = true;
      state.error?.uncaught?.push("Something went wrong");
    });

    // MATCHERS
    builder.addMatcher(
      (action) => action.type.endsWith("registerUser/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("registerUser/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("loginUser/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("loginUser/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("getUser/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getUser/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("updateUser/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("updateUser/fulfilled"),
      (state) => {
        state.hasError = false;
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getOrders/pending"),
      (state) => {
        state.ordersLoading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getOrders/fulfilled"),
      (state) => {
        state.hasError = false;
        state.ordersLoading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("getBackendUser/pending"),
      (state) => {
        state.xpLoading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getBackendUser/fulfilled"),
      (state) => {
        state.hasError = false;
        state.xpLoading = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("getUserEvents/pending"),
      (state) => {
        state.eventsLoading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("getUserEvents/fulfilled"),
      (state) => {
        state.hasError = false;
        state.eventsLoading = false;
      }
    );
  },
});

export const { logout, clearErrors, updateBackendUser, authFailedForUser } =
  userSlice.actions;
export default userSlice.reducer;
