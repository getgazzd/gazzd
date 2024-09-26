import { components } from "generatedTypes";
import { Product } from "types/product";

export interface Discounts {
  anyDiscount: boolean;
  discount: string;
  discountAsNumber: number;
  automaticDiscounts: any[];
  vouchers: any[];
}

export interface Totals {
  itemsTotalPrice: string;
  itemsTotalPriceAsNumber: number;
  totalDiscountPrice: number;
  totalDiscountPriceAsNumber: number;
  shippingPrice: string;
  shippingPriceAsNumber: number;
  handlingCostPrice: string;
  handlingCostPriceAsNumber: number;
  totalQuantity: number;
  taxDeducted: boolean;
  taxDeductedAsNumber: boolean;
  taxAdded: boolean;
  taxAddedAsNumber: boolean;
  taxPercent: number;
  grandTotalPrice: string;
  grandTotalPriceAsNumber: number;
  grandTotalPriceTax: string;
  grandTotalPriceTaxAsNumber: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  vatNumber: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

export interface CurrencyFormat {
  currency: string;
  name: string;
  prefix: string;
  suffix: string;
  decimalPoint: string;
  thousandsSeparator: string;
  decimalDigits: string;
  uri: string;
}

export interface ClientSide {
  externalScript: string;
}

export interface PaymentMethod {
  paymentMethod: string;
  name: string;
  paymentMethodType: string;
  supportsInitiateOnly: boolean;
  providesCustomerAddressAfterPayment: boolean;
  clientSide: ClientSide;
  handlingCost: string;
  handlingCostAsNumber: number;
}

export interface TermsAndConditions {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Email {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Company {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface FirstName {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface LastName {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Address1 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Address22 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface ZipCode {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface City {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface State {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Country {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface PhoneNumber {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface IdentityNumber {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface VatNumber {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface HouseNumber {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface HouseExtension {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Newsletter {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Address2 {
  email: Email;
  company: Company;
  firstName: FirstName;
  lastName: LastName;
  address1: Address1;
  address2: Address22;
  zipCode: ZipCode;
  city: City;
  state: State;
  country: Country;
  phoneNumber: PhoneNumber;
  identityNumber: IdentityNumber;
  vatNumber: VatNumber;
  houseNumber: HouseNumber;
  houseExtension: HouseExtension;
  newsletter: Newsletter;
}

export interface Email2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Company2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface FirstName2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface LastName2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Address12 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Address23 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface ZipCode2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface City2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface State2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface Country2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface PhoneNumber2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface HouseNumber2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface HouseExtension2 {
  type: string;
  required: boolean;
  visible: boolean;
}

export interface ShippingAddress2 {
  email: Email2;
  company: Company2;
  firstName: FirstName2;
  lastName: LastName2;
  address1: Address12;
  address2: Address23;
  zipCode: ZipCode2;
  city: City2;
  state: State2;
  country: Country2;
  phoneNumber: PhoneNumber2;
  houseNumber: HouseNumber2;
  houseExtension: HouseExtension2;
}

export interface PaymentFields {
  termsAndConditions: TermsAndConditions;
  address: Address2;
  shippingAddress: ShippingAddress2;
}

export interface ShippingMethod {
  shippingMethod: string;
  name: string;
  price: string;
  priceAsNumber: number;
}

export interface LoggedIn {
  token: string;
  customer: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  language?: any;
  newsletter: boolean;
  password: string;
}

export interface State3 {
  state: string;
  name: string;
}

export interface Country3 {
  country: string;
  name: string;
  eu: boolean;
  language: string;
  currency: string;
  states: State3[];
}

export interface Language {
  language: string;
  name: string;
  default: boolean;
}

export interface Language2 {
  language: string;
  name: string;
  default: boolean;
}

export interface Location {
  country: string;
  name: string;
  state?: any;
  stateName: string;
  eu: boolean;
  shipTo: boolean;
  market: number;
  pricelist: number;
  language: Language2;
}

export interface OrdersResponse {
  orders: Order[];
  ordersPaging: {
    from: number;
    to: number;
    totalSize: number;
  };
}

export interface GetOrdersArgs {
  from?: number;
  size?: number;
}

export type SelectionItem = components["schemas"]["SelectionItemModel"];

export interface OrderItem {
  item: string;
  productUrl: string | null;
  category: string | null;
  size: string;
  sku: string;
  ean: string;
  quantity: number;
  comment: string;
  line: string;
  priceEach: string;
  priceEachAsNumber: number;
  totalPrice: string;
  totalPriceAsNumber: number;
  priceEachBeforeDiscount: string;
  priceEachBeforeDiscountAsNumber: number;
  anyDiscount: boolean;
  taxPercent: number;
  priceEachWithoutTax: string;
  priceEachWithoutTaxAsNumber: number;
  priceEachReduction: string;
  priceEachReductionAsNumber: number;
  totalPriceBeforeDiscount: string;
  totalPriceBeforeDiscountAsNumber: number;
  product: Product;
}
export type Order = components["schemas"]["OrderModel"];
