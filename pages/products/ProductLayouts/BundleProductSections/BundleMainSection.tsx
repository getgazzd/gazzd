import { useTranslation } from "hooks";
import useCurrentProduct from "hooks/useCurrentProduct";
import product from "next-seo/lib/jsonld/product";
import { useState } from "react";
import { Product } from "types";

import ProductQuantity from "components/ProductSections/ProductSection/ProductDescription/ProductQuantity";
import ProductImagesMerch from "components/ProductSections/ProductSection/ProductImages/ProductImagesMerch";
import QuantityPicker from "components/QuantityPicker";
import AddToCart from "components/Shared/Buttons/AddToCart/AddToCart";

import BundleProductDescription from "./BundleProductDescription";

interface Props {
  product: Product;
}

const BundleMainSection = ({ product }: Props) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const { currentProduct, currency } = useCurrentProduct(product);
  const moneysaved =
    currentProduct?.bundleInfo?.priceOfItemsAsNumber &&
    currentProduct.priceAsNumber &&
    currentProduct?.bundleInfo?.priceOfItemsAsNumber -
    currentProduct?.priceAsNumber;

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 md:gap-16 md:p-16 container">
      <div className="md:col-span-7 md:col-start-1 md:px-32">
        {product.discountPercent === 0 && product && (
          <div
            style={{ background: product.contentfulProduct.accentColor }}
            className="absolute md:left-16 text-black inline-block px-1.5 py-0.5 z-30 "
          >
            {t("SAVE")} {moneysaved} {currency}
          </div>
        )}
        <ProductImagesMerch product={product} />
      </div>
      <div className="md:col-span-3 md:col-start-8 md:pt-8">
        <BundleProductDescription product={product} />
        <ProductQuantity
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <AddToCart
          size="bigFluid"
          customColor={product?.contentfulProduct?.accentColor}
          product={product}
          className="my-4"
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default BundleMainSection;
