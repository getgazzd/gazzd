import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "store/selectors/cart";
import {
  selectXP,
  selectCurrentLevel,
  selectPrevLevel,
} from "store/selectors/user";
import { getCartItems } from "store/thunks/cart";

export const useXPBar = () => {
  const xp = useSelector(selectXP);
  const [progress, setProgress] = useState<number>(xp || 0);
  const [expGained, setExpGained] = useState<number>(xp || 0);
  const newExpBar = useRef(null);
  const textRef = useRef(null);

  const currentLevel = useSelector(selectCurrentLevel);
  const prevLevel = useSelector(selectPrevLevel);

  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems({}));
  }, []);

  const cartValue = cart?.selection?.totals?.grandTotalPriceAsNumber;
  return { cartValue, prevLevel, currentLevel };
};
