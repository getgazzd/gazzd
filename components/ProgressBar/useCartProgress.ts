import { getCartItems } from "./../../store/thunks/cart";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "./../../store/selectors/cart";
import { useEffect } from "react";

export const useCartProgress = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems({}));
  }, []);

  const cartValue = cart?.selection?.totals?.grandTotalPriceAsNumber;
  return { cartValue };
};
