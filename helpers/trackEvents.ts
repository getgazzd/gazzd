import Bugsnag from "@bugsnag/js";
import Plausible from "plausible-tracker";
import posthog from "posthog-js";

export const EVENTS = {
  ADD_TO_CART: "add_to_cart",
  REMOVE_FROM_CART: "remove_from_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  GAZZADOR_CLICKED: "gazzador_clicked",
  PURCHASE: "purchase",
  SIGN_UP: "sign_up",
  LOGIN: "login",
  OPEN_SEND_CART: "open_send_cart",
  SEND_CART: "send_cart",
  OPENED_SHARED_CART: "opened_shared_cart",
};

const plausible = Plausible({
  domain: "gazzd.com",
  apiHost: "https://analytics.gazzd.com",
});

export const trackEvent = (event: string) => {
  try {
    plausible.trackEvent(event);
    posthog.capture(event);
  } catch (error) {
    Bugsnag.notify(
      `Error registering tracking event. error: ${JSON.stringify(error)}`
    );
  }
};
