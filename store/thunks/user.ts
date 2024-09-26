import { createAsyncThunk } from "@reduxjs/toolkit";
import { components, paths } from "generatedTypes";
import {
  getBackendUserAsync,
  getOrdersAsync,
  getUserAsync,
  getUserEventsAsync,
  loginUserAsync,
  logoutUserAsync,
  registerUserAsync,
  updateUserAsync,
} from "store/transfers/userApi";
import { CentraNetworkError, NetworkError } from "types/network";
import { SignupForm, UpdateForm, UserEvent, UserResponse } from "types/user";
import { BackendUser } from "types/user";
import { LoggedIn } from "types/user/centra";

type Props = Partial<SignupForm> & { callback?: () => void };

// Registers a new user at Centra
export const _registerUser = createAsyncThunk<
  UserResponse,
  Partial<SignupForm> & { callback?: () => void },
  {
    rejectValue: CentraNetworkError;
  }
>("user/registerUser", async (userData: Props, { rejectWithValue }) => {
  try {
    const { callback, ...fields } = userData ?? {};
    const response = await registerUserAsync(fields);
    callback && callback();
    return response;
  } catch (error) {
    return rejectWithValue(error as CentraNetworkError);
  }
});

// Creates a new User session at Centra
export const _loginUser = createAsyncThunk<
  UserResponse,
  Partial<SignupForm> & { callback?: () => void },
  { rejectValue: CentraNetworkError }
>("user/loginUser", async (userData: Props, { rejectWithValue }) => {
  try {
    const { callback, ...fields } = userData ?? {};
    const response = await loginUserAsync(fields);
    callback && callback();
    return response;
  } catch (error) {
    return rejectWithValue(error as CentraNetworkError);
  }
});

// Destroys the User session at Centra
export const _logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (callback?: () => void) => {
    try {
      const response = await logoutUserAsync();
      if (callback) callback();
      return response;
    } catch (error) {
      alert("error destroying user session");
    }
  }
);

// Fetches User information from Centra
export const _getUser = createAsyncThunk<
  LoggedIn,
  { callback?: () => void },
  {
    rejectValue: CentraNetworkError;
  }
>(
  "user/getUser",
  async (inputData: { callback?: () => void }, { rejectWithValue }) => {
    try {
      const { callback } = inputData;
      const response = await getUserAsync();
      callback && callback();
      return response;
    } catch (error) {
      console.log("User is probably not authenticatied");
      return rejectWithValue(error as CentraNetworkError);
    }
  }
);

// Creates a new User session at Centra
export const _updateUser = createAsyncThunk<
  UserResponse,
  Partial<UpdateForm>,
  { rejectValue: CentraNetworkError }
>("user/updateUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await updateUserAsync(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error as CentraNetworkError);
  }
});

// Gets orders for logged in user in Centra
export const _getOrders = createAsyncThunk<
  components["schemas"]["OrdersResponse"],
  Partial<
    paths["/orders"]["post"]["requestBody"]["content"]["application/json"]
  >,
  { rejectValue: CentraNetworkError }
>("user/getOrders", async (args, { rejectWithValue }) => {
  try {
    const response = await getOrdersAsync(args);
    return response;
  } catch (error) {
    return rejectWithValue(error as CentraNetworkError);
  }
});

// Gets orders for logged in user in Centra
export const getBackendUser = createAsyncThunk<
  BackendUser,
  string | undefined,
  { rejectValue: NetworkError }
>("user/getBackendUserAsync", async (token, { rejectWithValue }) => {
  try {
    const response = await getBackendUserAsync(token);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

// Gets event history for logged in user in Centra
export const getUserEvents = createAsyncThunk<
  { events: UserEvent[] },
  undefined,
  { rejectValue: NetworkError }
>("user/getUserEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await getUserEventsAsync();
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});
