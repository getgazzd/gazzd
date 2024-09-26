import { RootState } from "store";

export const selectSelection = (state: RootState) =>
  state?.selection?.selection;

export const selectCountries = (state: RootState) =>
  state?.selection?.selection?.countries;

export const selectCurrency = (state: RootState) =>
  state?.selection?.selection?.selection?.currency;

export const selectToken = (state: RootState) =>
  state?.selection?.selection?.token;

export const selectVouchers = (state: RootState) =>
  state?.selection?.selection?.selection?.discounts?.vouchers;

export const selectSelectionIsLoading = (state: RootState) =>
  state?.selection?.loading;

export const selectShippingMethods = (state: RootState) =>
  state?.selection?.selection?.shippingMethods;

export const selectShippingMethod = (state: RootState) =>
  state?.selection?.selection?.selection?.shippingMethod;

export const selectCheckoutScript = (state: RootState) =>
  state?.selection?.selection?.selection?.centraCheckoutScript;

export const selectMarket = (state: RootState) =>
  state?.selection?.selection?.location?.market;

export const selectShippingEmail = (state: RootState) =>
  state?.selection?.selection?.selection?.shippingAddress?.email;

export const selectUpdatedMarket = (state: RootState) =>
  state?.selection?.updatedMarket;
