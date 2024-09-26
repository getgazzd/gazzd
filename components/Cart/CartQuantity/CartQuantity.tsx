import { components } from "generatedTypes";
import { useQuantityPicker } from "hooks/useQuantityPicker";
import { Item } from "types/cart";

import QuantityPicker from "components/QuantityPicker";

export interface Props {
  item: Item;
}

function CartQuantity({ item }: Props) {
  const { quantity, increase, decrease } = useQuantityPicker(item);

  return (
    <QuantityPicker
      customLabelProduct={item.product}
      quantity={quantity}
      increaseEvent={increase}
      decreaseEvent={decrease}
    />
  );
}

export default CartQuantity;

const labels: Record<string, string> = {
  "Gamers supp": "tub",
  Energy: "can",
  Merchandise: "item",
  "Meal-shake": "bag",
  Bundle: "bundle",
};
