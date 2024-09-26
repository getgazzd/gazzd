import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Item, Product } from "types";

import Icon from "components/Shared/Icon";

import SizeGuide from "./SizeGuide";

interface Props {
  product: Product;
  selectedSize: Item;
  setSelectedSize: any;
}

const SizePicker = ({ product, setSelectedSize, selectedSize }: Props) => {
  const sizes = product.items;
  const firstNonSoldOutSize = sizes?.find((size) => size.stock !== "no");

  useEffect(() => {
    if (firstNonSoldOutSize) {
      setSelectedSize(firstNonSoldOutSize);
    }
  }, [product]);

  if (!product.contentfulProduct?.sizePicker) return null;
  return (
    <div className="w-full mt-4">
      <SizeGuide product={product} />
      <Listbox value={selectedSize} onChange={setSelectedSize}>
        <div className="relative">
          <Listbox.Button className="relative w-full border border-white p-2">
            <h4>{formatSizeName(selectedSize.name)}</h4>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center border-l px-1">
              <Icon type="expandArrow" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-full border text-center z-10">
              {sizes?.map((size) => (
                <Listbox.Option
                  key={size.sizeId}
                  className={({ active }) =>
                    `relative cursor-pointer select-none border-b border-borderGray bg-black/95 py-2 ${
                      active ? "bg-white/90 text-black" : "text-white"
                    }`
                  }
                  value={size}
                  disabled={size.stock === "no" ? true : false}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          size.stock === "no"
                            ? "text-gray-400 line-through"
                            : ""
                        }`}
                      >
                        {formatSizeName(size.name)}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                          &#10004;
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SizePicker;

const formatSizeName = (sizeName?: string) => {
  switch (sizeName) {
    case "x-small":
      return "EXTRA SMALL";
    case "small":
      return "SMALL";
    case "medium":
      return "MEDIUM";
    case "large":
      return "LARGE";
    case "x-large":
      return "EXTRA LARGE";
    case "xx-large":
      return "XX LARGE";
  }
};
