import useCurrentProduct from "hooks/useCurrentProduct";
import { useState } from "react";
import { Product } from "types/product";

import DynamicContent from "components/DynamicContent";
import ProductPrice from "components/ProductPrice/ProductPrice";
import AddToCart from "components/Shared/Buttons/AddToCart/AddToCart";

import ProductQuantity from "./ProductQuantity";

interface Props {
  product: Product;
}

function ProductDescription({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="text-left">
      <h1>{product?.contentfulProduct?.title}</h1>
      <p
        style={{ color: product?.contentfulProduct?.accentColor }}
        className="mb-6 font-black"
      >
        {product?.contentfulProduct?.servings}
      </p>

      <DynamicContent
        content={product?.contentfulProduct!.productDescription}
      />
      <ProductPrice product={product} className="my-8" />
      <ProductQuantity
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      {/* <ProductStock product={product} /> */}
      <AddToCart
        size="bigFluid"
        customColor={product?.contentfulProduct?.accentColor}
        product={product}
        className="my-4"
        quantity={quantity}
      />
    </div>
  );
}

export default ProductDescription;
