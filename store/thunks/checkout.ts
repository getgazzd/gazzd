import { createAsyncThunk } from "@reduxjs/toolkit";
import { components } from "generatedTypes";
import { EVENTS, trackEvent } from "helpers/trackEvents";
import { RootState } from "store";
import { selectShippingEmail } from "store/selectors/selection";
import { getAddressFromIdentityAsync } from "store/transfers/checkout";
import { IdentityResponse } from "types/checkout";
import { NetworkError } from "types/network";
import { PaymentResponse } from "types/payment";

import { getAffiliateCookie } from "./../../helpers/cookie";
import {
  createPaymentAsync,
  getPaymentResultAsync,
} from "./../transfers/checkout";

interface identityParams {
  identityNumber: string;
  paymentMethod: string;
}

export const getAddressFromIdentity = createAsyncThunk<
  IdentityResponse,
  Partial<identityParams>,
  {
    rejectValue: NetworkError;
  }
>(
  "checkout/getAddressFromIdentity",
  async (addressSearchData: Partial<identityParams>, { rejectWithValue }) => {
    try {
      const response = await getAddressFromIdentityAsync(addressSearchData);
      return response;
    } catch (error) {
      return rejectWithValue(error as NetworkError);
    }
  }
);

interface PaymentData {
  paymentMethod: string;
  paymentReturnPage: string;
  paymentFailedPage: string;
  termsAndConditions: true;
  affiliate?: string;
  address?: { email: string };
  shippingAddress?: { email: string };
}
export const createPayment = createAsyncThunk<
  PaymentResponse,
  undefined,
  {
    rejectValue: NetworkError;
  }
>("checkout/createPayment", async (_, { rejectWithValue, getState }) => {
  try {
    trackEvent(EVENTS.BEGIN_CHECKOUT);
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const activeAffiliate = getAffiliateCookie();
    const paymentData: PaymentData = {
      paymentMethod: "klarna",
      paymentReturnPage: `${baseUrl}/checkout/success`,
      paymentFailedPage: `${baseUrl}/checkout/failed`,
      termsAndConditions: true,
      affiliate: activeAffiliate,
    };

    const state = getState() as RootState;
    const shippingEmail = selectShippingEmail(state);
    if (shippingEmail) {
      const address = { email: shippingEmail };
      paymentData["address"] = address;
      paymentData["shippingAddress"] = address;
    }

    const response = await createPaymentAsync(paymentData);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});

export const getPaymentResult = createAsyncThunk<
  components["schemas"]["OrderCreatedResponse"],
  {
    centraPaymentMethod: string;
    klarna_order: string;
  },
  {
    rejectValue: NetworkError;
  }
>("checkout/getPaymentResult", async (args, { rejectWithValue }) => {
  try {
    const response = await getPaymentResultAsync(args);
    return response;
  } catch (error) {
    return rejectWithValue(error as NetworkError);
  }
});
