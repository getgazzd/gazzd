import React from "react";
import { Product, RelatedProduct } from "types";

import ProductGradient from "components/ProductGradient";
import RelatedProducts from "components/ProductSections/RelatedProducts/RelatedProducts";

import MerchProductMainSection from "./MerchProductSections/MerchProductMainSection";
import MerchProductSubSection from "./MerchProductSections/MerchProductSubSection";

interface Props {
  product: Product;
}

const MerchandiseLayout = ({ product }: Props) => {
  return (
    <>
      <div className={`product-select z-10 px-4 md:px-0`}>
        <MerchProductMainSection product={product} />
        {/* Disabled for now
        <MerchProductSubSection product={product} />
         */}
        <RelatedProducts
          products={product.relatedProducts as RelatedProduct[]}
        />
      </div>
      <ProductGradient content={product?.contentfulProduct} />
    </>
  );
};

export default MerchandiseLayout;
