import { components } from "generatedTypes";
import useTranslation from "hooks/useTranslation";
import { useSelector } from "react-redux";
import { selectCartLoading } from "store/selectors/cart";
import { Product } from "types";

import Loading from "components/Loading/Loading";

export interface Props {
  customLabelProduct?:
  | components["schemas"]["SelectionProductModel"] &
  components["schemas"]["ProductModel"];
  quantity: number;
  increaseEvent: () => void;
  decreaseEvent: () => void;
}

const QuantityPicker = ({
  customLabelProduct,
  quantity = 1,
  decreaseEvent,
  increaseEvent,
}: Props) => {
  const { t } = useTranslation();

  const cartLoading = useSelector(selectCartLoading);

  const customLabel = () => {
    if (customLabelProduct?.bundleInfo) {
      return "pack";
    } else {
      return customLabelProduct?.collectionName && labels[customLabelProduct?.collectionName]
        ? labels[customLabelProduct?.collectionName]
        : "item";
    }
  };

  return (
    <div
      className="flex w-full items-center justify-between border border-white"
      data-testid="quantityPicker"
    >
      <button
        data-testid="quantityButton"
        disabled={cartLoading}
        className={`flex h-10 w-10  select-none items-center justify-center border-r bg-transparent transition-colors hover:bg-white hover:text-black`}
        onClick={decreaseEvent}
      >
        <h4 className="text-current">-</h4>
      </button>
      {cartLoading ? (
        <Loading
          style={{
            width: 20,
            height: 20,
            transform: "scale(0.4) translate(-30px, -30px) ",
          }}
        />
      ) : (
        <h4 className="select-none">
          {quantity} {quantity === 1 ? customLabel() : customLabel() + "s"}
        </h4>
      )}
      <button
        data-testid="quantityButton"
        disabled={cartLoading}
        className={`flex h-10 w-10 select-none items-center justify-center border-l bg-transparent transition-colors hover:bg-white hover:text-black`}
        onClick={increaseEvent}
      >
        <h4 className="text-current">+</h4>
      </button>
    </div>
  );
};

export default QuantityPicker;

const labels: Record<string, string> = {
  "Bundle": "bundle",
  "Energy": "can",
  "Gamer supp": "tub",
  "Gamers supp": "tub",
  "Merchandise": "item",
  "Meal-shake": "bag",
  "Portion": "bag"
};
