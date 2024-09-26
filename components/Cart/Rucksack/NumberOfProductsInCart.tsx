import { components } from "generatedTypes";
import React from "react";

interface Props {
  currentCart: components["schemas"]["SelectionResponse"]["selection"];
}

const NumberOfProductsInCart = ({ currentCart }: Props) => {
  if (!currentCart?.items?.length) return null;
  return (
    <div className="absolute right-2 bottom-2 select-none h-4 w-4 rounded-full bg-white md:bottom-4 md:right-3">
      <h5 className="text-center text-black">{currentCart.items.length}</h5>
    </div>
  );
};

export default NumberOfProductsInCart;
