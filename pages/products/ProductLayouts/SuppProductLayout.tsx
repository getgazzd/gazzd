import { Product, RelatedProduct } from "types";

import ProductGradient from "components/ProductGradient";
import ProductSection from "components/ProductSections/ProductSection/ProductSection";
import RelatedProducts from "components/ProductSections/RelatedProducts/RelatedProducts";
import { SupplementSection } from "components/ProductSections/SupplementSection";

interface Props {
  product: Product;
}

const SuppProductLayout = ({ product }: Props) => {
  return (
    <>
      <div className={`product-select z-10 p-4 md:p-0 `}>
        <ProductSection product={product} />
        <SupplementSection content={product?.contentfulProduct} />
        <RelatedProducts
          products={product?.relatedProducts as RelatedProduct[]}
        />
      </div>
    </>
  );
};

export default SuppProductLayout;
