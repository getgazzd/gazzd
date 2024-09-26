import { components } from "generatedTypes";
import { EVENTS, trackEvent } from "helpers/trackEvents";
import { useTranslation } from "hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LegacyRef, useEffect, useRef, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import { useDispatch, useSelector } from "react-redux";
import { selectCreatePayment } from "store/selectors/checkout";
import { getPaymentResultAsync } from "store/transfers/checkout";
import { Order } from "types";

import BackgroundImage from "components/BackgroundImage";
import Gradient from "components/Gradient";
import Layout from "components/Layouts/PageLayout";
import Loading from "components/Loading/Loading";
import { fbPixelPurchase } from "components/MetaPixel/MetaPixel";
import SuccessLayout from "components/SuccessLayout/SuccessLayout";

const Success: NextPage = () => {
  const { t } = useTranslation();
  const paymentContainerRef = useRef<undefined | HTMLDivElement>();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const [receipt, set] = useState<
    undefined | components["schemas"]["OrderCreatedResponse"]
  >();

  const { query } = useRouter();

  const payment = useSelector(selectCreatePayment);

  useEffect(() => {
    const getReciept = async () => {
      try {
        const data = await getPaymentResultAsync({
          centraPaymentMethod: query.centraPaymentMethod as string,
          klarna_order: query.klarna_order as string,
        });
        fbPixelPurchase();
        set(data);
      } catch (error) {
        console.error(error);
        push("/");
      }
    };
    if (query.centraPaymentMethod) getReciept();
  }, [query]);

  useEffect(() => {
    trackEvent(EVENTS.PURCHASE);
  }, []);

  const clearPaymentContainer = () => {
    if (!paymentContainerRef.current) {
      return;
    }
    paymentContainerRef.current.innerHTML = "";
  };
  const appendToPaymentContainer = (html: string) => {
    if (!paymentContainerRef.current) {
      return;
    }
    const range = document.createRange();
    range.setStart(paymentContainerRef.current, 0);
    paymentContainerRef.current.appendChild(
      range.createContextualFragment(html)
    );
  };

  useEffect(() => {
    clearPaymentContainer();
    if (payment) appendToPaymentContainer(payment.formHtml);
  }, [payment]);

  return (
    <>
      <BackgroundImage page="products" />

      <Layout title="Payment successfull" description="payment was successfull">
        <h1 className="text-atomicApple">
          {t("Congrats! everything checks out.")}
        </h1>

        {!receipt ? (
          <Loading />
        ) : (
          <>
            <SuccessLayout order={receipt.order as Order} />
          </>
        )}
        <div className="h-full bg-white w-full">
          <div
            ref={paymentContainerRef as LegacyRef<HTMLDivElement>}
            className="align-self-center"
          />
        </div>
      </Layout>
      <Gradient gradientImage="two" />
    </>
  );
};

export default Success;
