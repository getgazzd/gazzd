import { useProductInStock } from "hooks/useProductInStock";
import React, { useEffect, useState } from "react";
import { Item } from "types";

interface Props {
  item: Item;
}
function MerchProductInStock({ item }: Props) {
  const isInStock = useProductInStock(item);

  return (
    <div className="pt-3 pb-4">
      {isInStock ? (
        <div className="flex items-center">
          <div className="h-3 w-3 mr-3 rounded-full bg-atomicApple" />{" "}
          <h4 className="text-gray-500">In stock — Ready to ship</h4>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="h-3 w-3 mr-3 rounded-full bg-midsummerMelon" />{" "}
          <h4 className="text-gray-500">out of stock</h4>
        </div>
      )}
    </div>
  );
}

export default MerchProductInStock;
