import { CartState } from "store/slices/cartSlice";
import { ProductsState } from "store/slices/productsSlice";
import { UserState } from "store/slices/userSlice";
import { Filter, Filters, Product } from "types/product";
import { User } from "types/user";
import { Selection } from "types/cart";
import { products } from "./mockedProducts";

export const cartInitialState = {
  selection: {} as Selection,
  open: false,
  error: {},
  hasError: false,
  loading: true,
} as CartState;

export const userInitialState = {
  user: {} as User,
  error: {},
  hasError: false,
  loading: true,
  loggedIn: false,
} as UserState;

export const productInitialState = {
  // @ts-ignore
  products: products as Product[],
  filters: [
    {
      field: "brands",
      values: [
        {
          count: 1,
          data: {
            category: "",
            metaDescription: "",
            metaKeywords: "",
            metaTitle: "",
            name: "Brand 1",
            uri: "",
          },
          filterCount: 1,
          totalCount: 1,
          value: "1",
        },
      ],
    },
  ] as Filter[],
  selectedFilters: {
    brands: [],
    categories: [],
    collections: [],
  } as Filters,
  error: {},
  hasError: false,
  loading: true,
} as ProductsState;

export const mockedInitialState = {
  cart: cartInitialState,
  user: userInitialState,
  products: productInitialState,
};
