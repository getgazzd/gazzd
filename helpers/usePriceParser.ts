import { useSelector } from "react-redux";
import { selectCurrency } from "store/selectors/selection";
import { Product } from "types";

export const usePriceParser = (price: string) => {
  const currency = useSelector(selectCurrency);
  if (!price) return "";
  if (currency && !["SEK", "DKK", "NOK".includes(currency)]) return price;
  return price?.replace(/\.(.*?[0]{1,2})/g, "");
};

export const useMoneySaved = (product: Product) => {
  if (product?.priceBeforeDiscountAsNumber && product?.priceAsNumber)
    return `${Math.round(
      product.priceBeforeDiscountAsNumber - product.priceAsNumber
    )}`;
  return "";
};
