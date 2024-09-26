import { mergeProducts } from "helpers/product";
import {
  ProductParams,
  ProductResponse,
  ProductsResponse,
} from "types/product";

import { mergeProduct } from "./../../helpers/product";
import { API } from "./config";

const DEFAULT_LIMIT = 100;

export const getProductsAsync = async ({
  skipFirst = 0,
  limit = DEFAULT_LIMIT,
  search = "",
  brands = [],
  categories = [],
  collections = [],
  ...rest
}: ProductParams) => {
  const api = API();
  return api
    .post<ProductsResponse>(`/products`, {
      skipFirst,
      limit,
      brands,
      search,
      categories,
      collections,
      relatedProducts: true,
      ...rest,
    })
    .then(async ({ data }) => {
      return {
        products: await mergeProducts(data),
        filter: data.filter,
      };
    });
};

export const getProductsByCategoryAsync = async (categoryUri: string) => {
  const api = API();
  return api
    .post<ProductsResponse>(`/products`, {
      uri: {
        uri: categoryUri,
        for: ["category"],
      },
      limit: DEFAULT_LIMIT,
    })
    .then(async ({ data }) => {
      return {
        products: await mergeProducts(data),
        filter: data.filter,
      };
    });
};

export const getProductAsync = async (slug?: string, args = {}) => {
  const api = API();
  return api
    .post<ProductResponse>(`/uri`, { uri: slug, for: ["product"], ...args })
    .then(({ data }) => {
      return mergeProduct(data);
    });
};

export const getProductPriceAsync = async (slug?: string, args = {}) => {
  const api = API();
  return api
    .post<ProductResponse>(`/uri`, { uri: slug, for: ["product"], ...args })
    .then(({ data }) => {
      return data.product;
    })
    .catch((err) => console.log(err));
};
