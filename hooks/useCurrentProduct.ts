import { usePriceParser } from "helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrency } from "store/selectors/selection";
import { getProductPriceAsync } from "store/transfers/productApi";
import { Product } from "types";

export default function useCurrentProduct(product: Product) {
  const [currentProduct, setCurrentProduct] = useState<Product | void>();
  const [currentParsedPrice, setCurrentParsedPrice] = useState<string>("");
  const [currentParsedTotalPrice, setCurrentTotalParsedPrice] =
    useState<string>("");
  const [
    currentParsedPriceBeforeDiscount,
    setCurrentParsedPriceBeforeDiscount,
  ] = useState<string>("");

  const currency = useSelector(selectCurrency);

  const originalPrice = usePriceParser(currentProduct?.price as string);
  const discountPrice = usePriceParser(
    currentProduct?.priceBeforeDiscount as string
  );
  // @ts-ignore
  const totalPrice = usePriceParser(currentProduct?.totalPrice as string);

  useEffect(() => {
    getProductPriceAsync(product.uri)
      .then((data) => setCurrentProduct(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentProduct?.price) setCurrentParsedPrice(originalPrice);
    if (currentProduct?.priceBeforeDiscount)
      setCurrentParsedPriceBeforeDiscount(discountPrice);
    if (currentProduct?.price) setCurrentTotalParsedPrice(totalPrice);
  }, [currentProduct]);

  return {
    currentParsedTotalPrice,
    currentProduct,
    currentParsedPrice,
    currentParsedPriceBeforeDiscount,
    currency,
  };
}
