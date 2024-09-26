import { Item, Product } from "types";

export const useProductInStock = (item?: Item) => {
  const inStock: boolean = item?.stock === "yes" ? true : false;
  return { inStock };
};

export const useCheckStock = (item?: Item) => {
  return item?.stock === "yes" ? true : false;
};

export const useCheckMerchStock = (product: Product) => {
  const findItemInStock = product?.items?.find((item) => item.stock === "yes");
  return findItemInStock ? true : false;
};
