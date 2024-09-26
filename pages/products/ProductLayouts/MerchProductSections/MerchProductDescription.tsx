import { usePriceParser } from "helpers/usePriceParser";
import React from "react";
import { Item, Product } from "types";

import DynamicContent from "components/DynamicContent";
import ProductPrice from "components/ProductPrice/ProductPrice";

import MerchProductInStock from "./MerchProductInStock";

interface Props {
  product: Product;
  selectedSize?: Item;
}

const MerchProductDescription = ({ product, selectedSize }: Props) => {
  const parsedPrice = usePriceParser(product.price as string);
  return (
    <div className="text-left">
      <h1>{product?.contentfulProduct?.title}</h1>
      {selectedSize && <MerchProductInStock item={selectedSize} />}
      <DynamicContent
        content={product?.contentfulProduct!.productDescription}
      />
      <ProductPrice product={product} className="my-8" />
    </div>
  );
};

export default MerchProductDescription;
