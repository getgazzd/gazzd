import { closeCart, openCart } from "store/slices/cartSlice";
import { selectCart, selectCartOpen } from "store/selectors/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AffiliateCartBar } from "components/AffiliateBar/AffiliateBarCart";
import { AnimatePresence } from "framer-motion";
import Button from "components/Button/Button";
import CartItem from "components/Cart/CartItem";
import { Item } from "types/cart";
import Link from "next/link";
import Rucksack from "../Rucksack";
import ShareCartLink from "./ShareMyCart";
import { ShippingCost } from "./ShippingCost";
import SideBar from "components/SideBar/SideBar";
import { getCartItems } from "store/thunks/cart";
import { useAddItemsDiscount } from "hooks/useAddItemsDiscount";
import { usePriceParser } from "helpers/usePriceParser";
import { useTranslation } from "hooks";

function CartElement() {
  const cart = useSelector(selectCart);
  const open = useSelector(selectCartOpen);
  const dispatch = useDispatch();
  const openSidebar = () => dispatch(openCart());
  const closeSidebar = () => dispatch(closeCart());

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(closeSidebar());
    dispatch(getCartItems({}));
  }, [dispatch]);

  const parsedPrice = usePriceParser(
    cart?.selection?.totals?.itemsTotalPrice ?? ""
  );
  const totals: any = cart?.selection?.totals;
  const { totalDiscount } = useAddItemsDiscount(cart.selection?.items);

  return (
    <>
      <Rucksack />

      <SideBar name="cart" open={open} theme="dark" handleClose={closeSidebar}>
        <div className="flex h-full w-full flex-col justify-between border-t border-borderGray bg-black pt-12 pl-12 md:pt-16 md:pl-0">
          <div className="cart-scroll overflow-y-scroll">
            <AnimatePresence initial={false}>
              {cart?.selection?.items?.map((item: Item) => {
                return <CartItem key={item.item} item={item} />;
              })}
            </AnimatePresence>
          </div>
          <div className="flex space-y-4 flex-col">
            <ShareCartLink />
            <AffiliateCartBar totalDiscount={totalDiscount} />
            <div className="px-2">
              <ShippingCost totals={totals} />
            </div>
            <div className="flex justify-between border-t border-borderGray py-4 px-2">
              <h5>{t("total")}</h5>
              <h2>{parsedPrice}</h2>
            </div>
            <Link href="/checkout" passHref>
              <a>
                <Button size="bigFluid">{t("checkout")}</Button>
              </a>
            </Link>
          </div>
        </div>
      </SideBar>
    </>
  );
}

export default CartElement;
