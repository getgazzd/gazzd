import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantityOfItem,
  increaseQuantityOfItem,
} from "store/thunks/cart";
import { Item } from "types/cart";

export interface Props {
  action: "increase" | "decrease";
  item: Item;
}

export const QuantityButton = ({ action, item }: Props) => {
  const dispatch = useDispatch();
  const increaseQuantityClickHandler = (line?: string) => {
    dispatch(increaseQuantityOfItem({ line, quantity: 1 }));
  };

  const decreaseQuantityClickHandler = (line?: string) => {
    dispatch(decreaseQuantityOfItem({ line, quantity: 1 }));
  };

  const clickHandler = () => {
    action === "increase"
      ? increaseQuantityClickHandler(item.line)
      : decreaseQuantityClickHandler(item.line);
  };
  return (
    <div
      data-testid="quantityButton"
      className={`flex h-9 w-9 cursor-pointer select-none items-center justify-center bg-transparent transition-colors hover:bg-white hover:text-black ${action === "increase" ? "border-l" : "border-r"
        }`}
      onClick={() => clickHandler()}
    >
      <h4 className="text-current">{action === "increase" ? "+" : "-"}</h4>
    </div>
  );
};

export default QuantityButton;
