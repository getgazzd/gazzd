import { EVENTS, trackEvent } from "helpers/trackEvents";
import { ICentraCheckout } from "hoc/CentraCheckoutHandler/CentraCheckoutHandler";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { increaseQuantityOfItem } from "store/thunks/cart";
import { Item } from "types/cart";

import { decreaseQuantityOfItem } from "./../store/thunks/cart";

declare const CentraCheckout: ICentraCheckout;

const TIMEOUT = 500;

export const useQuantityPicker = (item: Item) => {
  const [quantity, setQuantity] = useState<number>(item.quantity as number);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const dispatch = useDispatch();

  const suspendCheckout = () =>
    CentraCheckout?.suspend && CentraCheckout.suspend();

  const resumeCheckout = () =>
    CentraCheckout?.resume && setTimeout(CentraCheckout.resume, 500);

  const callback = (timeoutId?: NodeJS.Timeout) => {
    suspendCheckout();
    if (timeoutId === timeoutRef.current) {
      resumeCheckout();
    }
  };

  const increase = () => {
    suspendCheckout();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    timeoutRef.current = setTimeout(() => {
      suspendCheckout();
      dispatch(
        increaseQuantityOfItem({
          line: item.line,
          quantity: newQuantity,
          callback,
          timeoutId: timeoutRef.current,
        })
      );
    }, TIMEOUT);
  };

  const decrease = () => {
    suspendCheckout();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const newQuantity = quantity <= 0 ? 0 : quantity - 1;
    setQuantity(newQuantity);

    timeoutRef.current = setTimeout(() => {
      dispatch(
        decreaseQuantityOfItem({
          line: item.line,
          quantity: newQuantity,
          callback,
          timeoutId: timeoutRef.current,
        })
      );
      if (newQuantity <= 0) trackEvent(EVENTS.REMOVE_FROM_CART);
    }, TIMEOUT);
  };

  return { quantity, increase, decrease };
};
