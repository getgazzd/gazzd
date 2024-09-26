import { RadioGroup } from "@headlessui/react";
import { useTranslation } from "hooks";
import product from "next-seo/lib/jsonld/product";
import Link from "next/link";
import React, { useState } from "react";
import { productInitialState } from "tests/mock/mockedStore";
import { Product } from "types";

interface Props {
  product: Product;
}

const ColorPicker = ({ product }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(product);
  const [products, setProducts] = useState<Product[]>(() => {
    const products = [
      product,
      // @ts-ignore
      ...product.relatedProducts.filter((product) =>
        product.relation.includes("variant")
      ),
    ];
    setSelectedVariant(product);
    return products.sort((a, b) => a.name.localeCompare(b.name));
  });
  const { t } = useTranslation();

  if (!product.contentfulProduct?.colorPicker) return null;
  return (
    <div className="w-full">
      <RadioGroup
        value={selectedVariant}
        onChange={setSelectedVariant}
        className="grid grid-cols-2 gap-4  w-full "
      >
        {products.length > 0 &&
          products.map((variant: Product) => {
            if (variant.relation === "standard") return null;

            return (
              <Link
                href={variant?.uri as string}
                key={variant.uri}
                passHref
                scroll={false}
              >
                <RadioGroup.Option
                  key={variant.variantName}
                  value={variant}
                  className={({ checked }) =>
                    `${
                      checked ? "border-white bg-white" : "bg-black/90"
                    } w-full cursor-pointer border py-3 `
                  }
                >
                  {({ checked }) => (
                    <div className="pointer-events-none flex w-full items-center justify-center">
                      <RadioGroup.Label
                        as="h4"
                        className={` ${
                          !checked ? "text-white" : " text-black"
                        }`}
                      >
                        {variant.variantName}
                      </RadioGroup.Label>
                    </div>
                  )}
                </RadioGroup.Option>
              </Link>
            );
          })}
      </RadioGroup>
    </div>
  );
};

export default ColorPicker;
