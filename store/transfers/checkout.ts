import { components } from "generatedTypes";
import { IdentityResponse } from "types/checkout";
import { PaymentResponse } from "types/payment";

import { API, BACKEND_ADDRESS } from "./config";

export const getAddressFromIdentityAsync = async (addressSearchData: {}) => {
  const api = API();
  return api
    .post<IdentityResponse>(`/address-search`, addressSearchData)
    .then(({ data }) => data);
};

export const createPaymentAsync = async (paymentData: {}) => {
  const api = API();
  return api
    .post<PaymentResponse>(`/payment`, paymentData)
    .then(({ data }) => data);
};

export const getPaymentResultAsync = async (args: {
  centraPaymentMethod: string;
  klarna_order: string;
}) => {
  const api = API();
  return api
    .post<components["schemas"]["OrderCreatedResponse"]>("/payment-result", {
      paymentMethodFields: args,
    })
    .then(({ data }) => data);
};

export const getLastReceiptAsync = async () => {
  const api = API();
  return api
    .get<components["schemas"]["OrderCompleteResponse"]>("/receipt")
    .then(({ data }) => data);
};

export const getVouchersAsync = async () => {
  const api = API();
  return api
    .get<[{ voucher: string; added: boolean }]>(
      `${BACKEND_ADDRESS}/payments/vouchers`
    )
    .then(({ data }) => data);
};
