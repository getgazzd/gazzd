import { components } from "generatedTypes";
import { useTranslation } from "hooks";
import React from "react";
import { Product, RelatedProduct } from "types/product";

import ProductsGrid from "components/ProductsGrid/ProductsGrid";

interface Props {
  products: RelatedProduct[];
}
const RelatedProducts = ({ products }: Props) => {
  const { t } = useTranslation();
  const relatedProducts = products.slice(0, 3);

  if (products?.length === 0) return null;
  return (
    <div className="flex flex-col items-center py-20 ">
      <h2 className=" text-center font-highlander text-4xl font-light leading-relaxed sm:text-6xl md:pb-8 md:text-7xl">
        {t("Others also bought")}
      </h2>
      <ProductsGrid products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;
