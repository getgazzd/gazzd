import ProductImage from "components/ProductImage";

import { ProductSectionProps } from "../ProductSection";
import SvgCross from "./SvgCross";

function ProductImagesMerch({ product }: ProductSectionProps) {
  return (
    <div className="relative z-10 flex items-center justify-center pb-8 md:p-0 md:m-0">
      <div
        className="absolute flex justify-center top-16 md:top-32 select-none md:h-full md:w-full"
        style={{ color: product.contentfulProduct?.accentColor }}
      >
        <SvgCross />
      </div>
      <div className="mx-auto h-full w-full ">
        <ProductImage product={product} />
      </div>
    </div>
  );
}

export default ProductImagesMerch;
