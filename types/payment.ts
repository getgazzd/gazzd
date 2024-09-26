import { Item } from "./cart";

export interface PaymentResponse {
  formHtml: string;
  paymentMethod: string;
  order: "string";
  items: Item[];
  paymentReturnPage: string;
  paymentFailedPage: string;
  termsAndConditions: boolean;
  address: {
    newsletter: boolean;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    zipCode: string;
    city: string;
    country: string;
  };
}
