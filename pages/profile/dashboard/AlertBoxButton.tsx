import { useTranslation } from "hooks";
import React from "react";

import Button from "components/Button/Button";
import { ToastStatus, showToast } from "components/Toast/Toast";

import { useBackendUser } from "./useBackendUser";

const AlertBoxButton = () => {
  const { t } = useTranslation();
  const { user } = useBackendUser();

  const handleClick = async () => {
    if (user) {
      const inviteLink = user.alert_box_url;
      navigator.clipboard.writeText(inviteLink);
      showToast({
        message: t("Alert box link copied!"),
        status: ToastStatus.SUCCESS,
      });
    }
  };
  if (!user) return null;
  return (
    <Button
      customColor={user.accentColor}
      size="smallFluid"
      onClick={handleClick}
    >
      Copy Alertbox link
    </Button>
  );
};

export default AlertBoxButton;
