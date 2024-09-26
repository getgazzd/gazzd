import ProductImage from "components/ProductImage";

import { ProductSectionProps } from "../ProductSection";
import SvgCross from "./SvgCross";

function ProductImages({ product }: ProductSectionProps) {
  return (
    <div className="relative z-10 flex items-center justify-center p-4 md:p-16">
      <div
        className="absolute bottom-0 -left-10 h-2/3 w-2/3 select-none md:-bottom-48 md:-left-40 md:h-full md:w-full"
        style={{ color: product.contentfulProduct?.accentColor }}
      >
        <div className="max-w-[600px] z-0">
          <SvgCross />
        </div>
      </div>
      <div className="mx-auto w-full">
        <ProductImage product={product} />
      </div>
    </div>
  );
}

export default ProductImages;
