import { useTranslation } from "hooks";
import React from "react";
import { BACKEND_ADDRESS } from "store/transfers/config";

import Button from "components/Button/Button";
import { ToastStatus, showToast } from "components/Toast/Toast";

import { useBackendUser } from "./useBackendUser";

const TestAlertBoxButton = () => {
  const { t } = useTranslation();
  const { user } = useBackendUser();

  const handleClick = async () => {
    if (user) {
      const encodedAffiliateId = user.alert_box_url.split("/").pop();
      try {
        await fetch(`${BACKEND_ADDRESS}/alert_box/${encodedAffiliateId}/play`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Test Alert",
            products: ["blueberry blizz", "pesky pineapple", "loco lemon"],
          }),
        });

        showToast({
          message: t("Alert box event sent to your URL"),
          status: ToastStatus.SUCCESS,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!user) return null;
  return (
    <Button
      customColor={user.accentColor}
      size="smallFluid"
      onClick={handleClick}
    >
      Try Alertbox
    </Button>
  );
};

export default TestAlertBoxButton;
