import { useEffect, useState } from "react";

export const useAddItemsDiscount = (items: any) => {
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    setTotalDiscount(0);
    items &&
      items.map((item: any) => {
        setTotalDiscount(
          (prev) => prev + item.priceEachReductionAsNumber * item.quantity
        );
      });
  }, [items]);

  return { totalDiscount };
};
