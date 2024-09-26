import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AffiliateCartBar } from "components/AffiliateBar/AffiliateBarCart";
import CartItem from "../CartItem";
import { Item } from "types/cart";
import ShareCartLink from "../DrawerCart/ShareMyCart";
import VoucherDisclaimer from "./Vouchers/VoucherDisclaimer";
import VoucherInput from "components/VoucherInput";
import { getCartItems } from "store/thunks/cart";
import { selectCart } from "store/selectors/cart";
import { useAddItemsDiscount } from "hooks/useAddItemsDiscount";
import { usePriceParser } from "helpers";
import { useTranslation } from "hooks";

function CartSummary() {
  const { t } = useTranslation();
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const { totalDiscount } = useAddItemsDiscount(cart.selection?.items);

  useEffect(() => {
    dispatch(getCartItems({}));
  }, [dispatch]);

  const productsPrice = usePriceParser(
    cart.selection?.totals?.itemsTotalPrice as string
  );
  const shippingPrice = usePriceParser(
    cart.selection?.totals?.shippingPrice as string
  );
  const discountPrice = usePriceParser(
    cart.selection?.totals?.totalDiscountPrice as string
  );

  const totalPrice = usePriceParser(
    cart.selection?.totals?.grandTotalPrice as string
  );

  return (
    <>
      <div className="flex flex-col" data-testid="listCartItem">
        <div className="flex flex-1 flex-col">
          {cart?.selection?.items?.map((item: Item) => {
            return (
              <div key={item.item} className="md:w-3/4">
                <CartItem item={item} />
              </div>
            );
          })}
        </div>

        <div className="px-4 pb-4 border-borderGray space-y-4">
          <VoucherDisclaimer />
          <div className="flex flex-col md:flex-row gap-4">
            <VoucherInput />
            <ShareCartLink />
          </div>
        </div>

        <div className="border-t border-borderGray flex space-y-2 flex-col">
          <AffiliateCartBar totalDiscount={totalDiscount} />
          <div className="grid grid-cols-2 border-b border-borderGray p-2">
            <h5>{t("Products")}:</h5>
            <h4 className="text-right">{productsPrice}</h4>
          </div>

          <div className="grid grid-cols-2 p-2 border-b border-borderGray">
            <h5>{t("Shipping")}:</h5>
            <h4 className="text-right">{shippingPrice}</h4>
          </div>
          <AnimatePresence>
            {cart.selection?.totals?.totalDiscountPrice && (
              <motion.div
                className="grid grid-cols-2 p-2 border-b border-borderGray"
                {...discountAnimation}
              >
                <h5 className="text-blueberryBlizz">{t("Discounts")}:</h5>
                <h4 className="text-right text-blueberryBlizz">
                  {discountPrice}
                </h4>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="p-2">
          <div className="mb-4 flex items-center justify-between">
            <h5>{t("Totals")}:</h5>
            <h2 className="text-right">{totalPrice}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSummary;

const discountAnimation = {
  initial: { opacity: 0.3, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.2 },
};
