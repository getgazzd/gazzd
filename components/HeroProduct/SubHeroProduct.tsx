import { Product, SubProduct } from "types";

import Button from "components/Button/Button";
import DynamicContent from "components/DynamicContent";
import Link from "next/link";
import ProductImage from "components/ProductImage";
import React from "react";
import SvgCross from "components/ProductSections/ProductSection/ProductImages/SvgCross";

interface Props {
  product: Product;
  subProduct: SubProduct;
}

const SubHeroProduct = ({ product, subProduct }: Props) => {
  if (!product) return null;
  return (
    <div className="radialGradient relative flex h-auto w-full flex-col md:flex-row md:p-16 p-8 box-border">
      <div className="z-10 flex h-full flex-col justify-center py-12  md:py-0">
        <h2>
          <CustomColor product={product}>
            <DynamicContent content={subProduct?.fields.description} />
          </CustomColor>
        </h2>
        <Link href={subProduct?.fields.buttonLink}>
          <a>
            <Button variant="ghost">{subProduct?.fields.buttonText}</Button>
          </a>
        </Link>
      </div>

      <div
        className="relative h-full w-full items-center justify-center"
        style={{ color: product?.contentfulProduct?.accentColor }}
      >
        <div className="absolute my-auto w-full">
          <SvgCross />
        </div>
        <div className="w-full p-8 md:p-0">
          <ProductImage product={product} />
        </div>
      </div>
      <style jsx>{`
        .radialGradient:before {
          overflow: hidden;
          content: "";
          opacity: 15%;
          position: absolute;
          height: 100%;
          max-height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          background: linear-gradient(
            -90deg,
            ${product?.contentfulProduct?.accentColor} 0,
            rgba(0, 0, 0, 1) 50%
          );
        }
      `}</style>
    </div>
  );
};

export default SubHeroProduct;

const CustomColor = ({ children, product }: any) => {
  const cust = children.props.content.content[0].content[0].value as string;
  const inputText = /<color>(.*?)<\/color>/g.exec(cust);

  if (inputText) {
    return (
      <>
        {cust.replace(inputText[0], "")}
        <div
          className="pb-6"
          style={{ color: product?.contentfulProduct?.accentColor }}
        >
          {inputText[1]}
        </div>
      </>
    );
  } else {
    return <span>{children}</span>;
  }
};
