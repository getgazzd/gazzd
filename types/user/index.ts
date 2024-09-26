import {
  Country3,
  Language,
  LoggedIn,
  PaymentFields,
  PaymentMethod,
  ShippingMethod,
} from "./centra";

export * from "./centra";

/**
 * Global User object
 */
export interface User extends LoggedIn {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
}

/**
 * UserResponse object when register
 */

export interface UserResponse {
  token: string;
  selection: Selection;
  paymentMethods: PaymentMethod[];
  paymentFields: PaymentFields;
  shippingMethods: ShippingMethod[];
  loggedIn: LoggedIn;
  countries: Country3[];
  languages: Language[];
  location: Location;
}

/**
 * Signup form when register as a new User
 */
export interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1?: string;
  address2?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  newsLetter?: boolean;
  language?: string;
  gender?: string;
}

export interface SignupFormState {
  firstName: {
    value?: string;
    error?: string;
  };
  lastName: {
    value?: string;
    error?: string;
  };
  email: {
    value?: string;
    error?: string;
  };
  password: {
    value?: string;
    error?: string;
  };
  address1?: {
    value?: string;
    error?: string;
  };
  address2?: {
    value?: string;
    error?: string;
  };
  zipCode?: {
    value?: string;
    error?: string;
  };
  city?: {
    value?: string;
    error?: string;
  };
  state?: {
    value?: string;
    error?: string;
  };
  country?: {
    value?: string;
    error?: string;
  };
  phoneNumber?: {
    value?: string;
    error?: string;
  };
  newsLetter?: {
    value?: string;
    error?: string;
  };
  language?: {
    value?: string;
    error?: string;
  };
  gender?: {
    value?: string;
    error?: string;
  };
}

export interface PaymentForm {
  paymentMethod: "test-payment-method" | "klarna" | "test-payment";
  paymentReturnPage: string;
  paymentFailedPage: string;
  termsAndConditions: true;
  address: AddressForm;
}

export interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1?: string;
  address2?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  newsletter?: boolean;
  language?: string;
  gender?: string;
}

/**
 * Update User form
 */
export interface UpdateForm extends SignupForm {
  firstName: string;
  lastName: string;
  newEmail?: string;
}

export interface UserEvent {
  event_type: string;
  points: number;
  action: string;
  created_at: string;
}

export interface BackendUser {
  id: number;
  email: string;
  centra_id: string;
  centra_token: string;
  invite_token: string;
  xp: number;
  level: number;
  current_level: CurrentLevel;
  next_level: NextLevel;
  prev_level: PrevLevel;
  created_at: string;
  updated_at: string;
  birthday: string;
  role: string;
  twitch_name: string;
  affiliate: string;
  orders: SteamerOrder[];
  alert_box_url: string;
  steamerPage: boolean;
  handle: string;
  market: string;
  percentOff: number;
  percentEarnings: number;
  accentColor: string;
  avatar: string;
  fullName: string;
  lockImageToTop: boolean;
}

export interface CurrentLevel {
  level: number;
  limit: number;
  multiplier: number;
}

export interface NextLevel {
  level: number;
  limit: number;
  multiplier: number;
}

export interface PrevLevel {
  level: number;
  limit: number;
  multiplier: number;
}

export interface SteamerOrder {
  id: number;
  total: number;
  order_date: string;
  grand_total: string;
  total_quantity: number;
  products: SteamerProduct[];
}

export interface SteamerProduct {
  name: string;
  price: string;
  quantity: number;
}
