import Image from "next/image";
import React from "react";
import { Product } from "types/product";

interface Props {
  product: Product;
}
const ProductBackground = ({ product }: Props) => {
  return (
    <div className="mouse pointer-events-none absolute inset-0 z-0 h-full select-none">
      <Image
        src={
          "https:" +
          product?.contentfulProduct?.pageBackground?.fields?.file?.url
        }
        alt="background"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default ProductBackground;
