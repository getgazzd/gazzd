import { components } from "generatedTypes";
import { Product } from "types/product";

import QuantityPicker from "components/QuantityPicker";

interface Props {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

function ProductQuantity({ product, quantity, setQuantity }: Props) {
  const decreaseQuantityClickHandler = () => {
    if (quantity <= 1) setQuantity(1);
    else setQuantity(quantity - 1);
  };

  const increaseQuantityClickHandler = () => {
    setQuantity(quantity + 1);
  };

  return (
    <QuantityPicker
      customLabelProduct={product}
      quantity={quantity}
      decreaseEvent={decreaseQuantityClickHandler}
      increaseEvent={increaseQuantityClickHandler}
    />
  );
}

export default ProductQuantity;
