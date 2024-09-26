import { Portal } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectCartOpen } from "store/selectors/cart";
import { closeCart, openCart } from "store/slices/cartSlice";

import BorderIcon from "components/Shared/Icon/BorderIcon";

import NumberOfProductsInCart from "./NumberOfProductsInCart";

const animation = {
  initial: { x: 3 },
  animate: { x: 0 },
  exit: { x: 5, opacity: 0 },
};

const Rucksack = () => {
  const open = useSelector(selectCartOpen);
  const dispatch = useDispatch();
  const openSidebar = () => dispatch(openCart());
  const closeSidebar = () => dispatch(closeCart());
  const cart = useSelector(selectCart);

  return (
    <div className=" md:flex md:items-stretch overflow-hidden">
      <AnimatePresence>
        {open ? (
          <Portal>
            <motion.div
              className="fixed z-50 top-0 left-0 bg-black md:inset-auto md:top-0 md:right-[calc(425px-theme(space.16))] md:bg-transparent"
              {...animation}
            >
              <BorderIcon type="rucksack" />
              <NumberOfProductsInCart currentCart={cart.selection} />
            </motion.div>
          </Portal>
        ) : (
          ""
        )}
      </AnimatePresence>
      <div
        onClick={!open ? () => openSidebar() : () => closeSidebar()}
        data-testid="rucksack"
        className="cursor-pointer border-l border-borderGray hover:bg-gray-900"
      >
        <AnimatePresence>
          {open ? (
            <>
              <BorderIcon className="hidden" type="rucksack" />
              <Portal>
                <div className="fixed z-50 top-0 right-0 cursor-pointer">
                  <BorderIcon type="close" />
                </div>
              </Portal>
            </>
          ) : (
            <>
              <motion.div {...animation}>
                <BorderIcon type="rucksack" />
              </motion.div>
              <NumberOfProductsInCart currentCart={cart.selection} />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Rucksack;
