import { components, paths } from "generatedTypes";
import { PaymentFieldArgs } from "store/thunks/selection";

import { API, BACKEND_ADDRESS } from "./config";

export const getSelectionAsync = async () => {
  const api = API();
  return api
    .get<components["schemas"]["SelectionResponse"]>(`/selection`)
    .then(({ data }) => data);
};

export const updateSelectionAsync = async (args: any) => {
  const api = API();
  return api
    .put<components["schemas"]["SelectionResponse"]>(
      `${BACKEND_ADDRESS}/selection`,
      args
    )
    .then(({ data }) => data);
};

export const switchSelectionAsync = async (selection: string) => {
  const api = API();
  return api
    .put<components["schemas"]["SelectionResponse"]>(`/selection/${selection}`)
    .then(({ data }) => data);
};

export const updatePaymentFieldsAsync = async (args: PaymentFieldArgs) => {
  const api = API();
  return api
    .put<
      paths["/payment-fields"]["put"]["responses"][200]["content"]["application/json"]
    >(`/payment-fields`, args)
    .then(({ data }) => data);
};

export const updateCountryAsync = async (country?: string) => {
  const api = API();
  return api
    .put<components["schemas"]["SelectionResponse"]>(
      `/countries/${country}`,
      {}
    )
    .then(({ data }) => data);
};

export const removeVoucherAsync = async (voucher: string) => {
  const api = API();
  return api
    .delete<components["schemas"]["SelectionResponse"]>(`/vouchers/${voucher}`)
    .then(({ data }) => data);
};

export const initCheckoutAsync = async () => {
  const api = API();
  return api
    .post<components["schemas"]["OrderCompleteResponse"]>(
      `${BACKEND_ADDRESS}/payments/checkout`
    )
    .then(({ data }) => data);
};

export const addVoucherCentraAsync = async (voucher: string) => {
  const api = API();
  return await api
    .post<
      paths["/vouchers"]["post"]["responses"][200]["content"]["application/json"]
    >(`vouchers`, { voucher })
    .then(({ data }) => data);
};

export const addVoucherAsync = async (args: { voucher: string }) => {
  const api = API();
  return api
    .post<components["schemas"]["OrderCompleteResponse"]>(
      `${BACKEND_ADDRESS}/payments/add_voucher`,
      args
    )
    .then(({ data }) => data);
};

export const updateShippingMethodAsync = async (args: {
  shippingMethod: string;
}) => {
  const api = API();
  return api
    .put<components["schemas"]["SelectionResponse"]>(
      `/shipping-methods/${args.shippingMethod}`,
      args
    )
    .then(({ data }) => data);
};
