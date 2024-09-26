import { useState } from "react";
import { Item, Product } from "types";

import ColorPicker from "components/ColorPicker";
import ProductImage from "components/ProductImage";
import PriceOffProductLayout from "components/ProductSections/ProductSection/PriceOffProductLayout";
import ProductImagesMerch from "components/ProductSections/ProductSection/ProductImages/ProductImagesMerch";
import QuantityPicker from "components/QuantityPicker";
import AddToCart from "components/Shared/Buttons/AddToCart/AddToCart";
import SizePicker from "components/SizePicker";

import MerchProductDescription from "./MerchProductDescription";
import MerchProductDetails from "./MerchProductDetails";
import MerchProductIcons from "./MerchProductIcons";

interface Props {
  product: Product;
}

const MerchProductMainSection = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState(
    product?.items && product?.items[0]
  );
  return (
    <div className="flex flex-col md:flex-row h-full w-full items-start justify-center container mx-auto ">
      <div className="h-full w-full md:w-3/5 mt-12 md:mt-16 ">
        <PriceOffProductLayout product={product} />
        <ProductImagesMerch product={product} />
        {/* @ts-ignore */}
        {product?.media?.full[1] && (
          <div className="hidden md:block">
            <ProductImage
              product={product}
              // @ts-ignore
              source={product?.media["1200x1200"][1]}
            />
          </div>
        )}
      </div>
      <div className="flex h-full w-full md:w-2/5 max-w-[425px] flex-col justify-self-auto md:items-center md:justify-center md:pt-[7%] md:pl-16">
        <MerchProductDescription
          selectedSize={selectedSize}
          product={product}
        />
        <ColorPicker product={product} />
        <SizePicker
          selectedSize={selectedSize as Item}
          setSelectedSize={setSelectedSize}
          product={product}
        />
        {product.contentfulProduct?.quantityPicker && (
          <QuantityPicker
            quantity={1}
            increaseEvent={() => { }}
            decreaseEvent={() => { }}
          />
        )}
        <AddToCart
          item={selectedSize}
          size="bigFluid"
          customColor={product?.contentfulProduct?.accentColor}
          product={product}
          className="my-4"
          quantity={1}
        />
        <MerchProductIcons />
        <MerchProductDetails product={product} />
      </div>
      {/* @ts-ignore */}
      {product?.media["1200x1200"][1] && (
        <div className="block md:hidden">
          {/* @ts-ignore */}
          <ProductImage
            product={product}
            source={product?.media["1200x1200"][1]}
          />
        </div>
      )}
    </div>
  );
};

export default MerchProductMainSection;
