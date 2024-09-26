import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import drawerMenuReducer from "./slices/drawerMenu";
import selectionReducer from "./slices/selectionSlice";

export const reducer = {
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  drawerMenu: drawerMenuReducer,
  selection: selectionReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
