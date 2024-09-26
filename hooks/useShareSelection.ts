import { EVENTS, trackEvent } from "helpers/trackEvents";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "store/selectors/selection";
import { updatePaymentFields } from "store/thunks/selection";

import { ToastStatus, showToast } from "components/Toast/Toast";

import useTranslation from "./useTranslation";

const useShareSelection = () => {
  const { t } = useTranslation();
  const selectionToken = useSelector(selectToken);
  const dispatch = useDispatch();

  const copyLinkToClipboard = () => {
    const link = `${window.location.protocol}//${window.location.host}/cartAbandonment/${selectionToken}`;
    navigator.clipboard.writeText(link);
    showToast({
      message: t("Link copied!"),
      status: ToastStatus.SUCCESS,
    });
  };

  const sendEmail = (email: string) => {
    if (email) {
      dispatch(
        updatePaymentFields({
          shippingAddress: { email: email },
          cartAbandonmentEmail: true,
          callback: () => {
            trackEvent(EVENTS.SEND_CART);
            showToast({
              message: t("Sent!"),
              status: ToastStatus.SUCCESS,
            });
          },
        })
      );
    }
  };

  return {
    copyLinkToClipboard,
    sendEmail,
  };
};

export default useShareSelection;
