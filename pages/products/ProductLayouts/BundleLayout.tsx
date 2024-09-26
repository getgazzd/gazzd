import React from "react";
import { Product, RelatedProduct } from "types";

import ProductGradient from "components/ProductGradient";
import RelatedProducts from "components/ProductSections/RelatedProducts/RelatedProducts";

import BundleMainSection from "./BundleProductSections/BundleMainSection";

interface Props {
  product: Product;
}

const BundleLayout = ({ product }: Props) => {
  return (
    <>
      <div className={`product-select z-10 px-4 md:px-0`}>
        <BundleMainSection product={product} />
        <RelatedProducts
          products={product.relatedProducts as RelatedProduct[]}
        />
      </div>
      <ProductGradient content={product?.contentfulProduct} />
    </>
  );
};

export default BundleLayout;
