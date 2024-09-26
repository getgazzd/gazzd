import { RootState } from "store";

export const selectAddressSearch = (state: RootState) => state.checkout.address;
export const selectCreatePayment = (state: RootState) => state.checkout.payment;
export const selectCreatePaymentResult = (state: RootState) =>
  state.checkout.paymentResult;
export const selectCheckoutLoading = (state: RootState) =>
  state.checkout.loading;
