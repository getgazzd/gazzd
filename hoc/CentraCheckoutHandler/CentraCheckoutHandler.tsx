import Script from "next/script";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCheckoutScript } from "store/selectors/cart";
import { selectSelection } from "store/selectors/selection";
import { updatePaymentFields } from "store/thunks/selection";

export interface ICentraCheckout {
  resume?: () => void;
  suspend?: () => void;
}

declare const window: any;

const CentraCheckoutHandler = () => {
  // const [ready, setReady] = useState(false);
  // const [mountedListener, setMountedListener] = useState(false);
  // const dispatch = useDispatch();
  const checkoutScript = useSelector(selectCartCheckoutScript);
  // const selection = useSelector(selectSelection);

  // const handler = (data: any) => {
  //   if (data.email) {
  //     dispatch(
  //       updatePaymentFields({
  //         shippingAddress: { email: data.email },
  //         cartAbandonmentEmail: true,
  //       })
  //     );
  //   }
  // };

  // try {
  //   if (!ready && window._klarnaCheckout) setReady(true);
  // } catch (error) {}

  // useEffect(() => {
  //   if (mountedListener) return;
  //   if (ready) {
  //     window._klarnaCheckout((api: any) => {
  //       api.on({
  //         change: handler,
  //       });
  //     });
  //     setMountedListener(true);
  //   }
  // }, [ready]);

  return (
    <>
      {checkoutScript && (
        <>
          <Script
            id="checkout-script"
            dangerouslySetInnerHTML={{
              __html: checkoutScript,
            }}
          />
        </>
      )}
    </>
  );
};
export default CentraCheckoutHandler;
