import { useTranslation } from "hooks";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import { useSelector } from "react-redux";
import { selectCartItems } from "store/selectors/cart";

import Button from "components/Button/Button";
import CartSummary from "components/Cart/CartSummary/CartSummary";
import CheckoutFlow from "components/CheckoutFlow/CheckoutFlow";
import Layout from "components/Layouts/PageLayout";
import { fbPixelInitiateCheckout } from "components/MetaPixel/MetaPixel";
import ShippingMethods from "components/ShippingMethods/ShippingMethods";

const Checkout: NextPage = () => {
  const { t } = useTranslation();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    fbPixelInitiateCheckout();
  }, []);

  return (
    <Layout title="Checkout" description="Time to checkout" noPadding>
      {cartItems && cartItems?.length > 0 ? (
        <>
          <section className="flex flex-col lg:flex-row w-full h-screen">
            <div className="w-full flex flex-col space-y-4 pb-12">
              <CartSummary />
              <ShippingMethods />
            </div>
            <div className="w-full h-full">
              <CheckoutFlow />
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-12">
          <h2>{t("You haven't added anything to your cart...")}</h2>
          <Link href="/products" passHref>
            <Button className="scale-125">{t("Continue shopping!")}</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;
