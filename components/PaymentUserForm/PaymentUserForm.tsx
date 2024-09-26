import { useTranslation } from "hooks";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "store/selectors/cart";
import {
  selectCheckoutLoading,
  selectCreatePayment,
} from "store/selectors/checkout";
import { createPayment } from "store/thunks/checkout";

import Loading from "components/Loading/Loading";

function PaymentUserForm() {
  const dispatch = useDispatch();
  const paymentContainerRef = useRef<undefined | HTMLDivElement>();
  const { t } = useTranslation();
  const payment = useSelector(selectCreatePayment);
  const loading = useSelector(selectCheckoutLoading);
  const cartItems = useSelector(selectCartItems);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    dispatch(createPayment());
  }, []);

  useEffect(() => {
    if (payment && !started) {
      appendToPaymentContainer(payment.formHtml);
      setStarted(true);
    }
  }, [payment]);

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

  if (loading && !started) return <Loading />;
  if (cartItems?.length === 0) return <div>{t("No items in cart")}</div>;
  return (
    <div className="h-full bg-white">
      <div
        ref={paymentContainerRef as LegacyRef<HTMLDivElement>}
        className="align-self-center"
      />
    </div>
  );
}

export default PaymentUserForm;
