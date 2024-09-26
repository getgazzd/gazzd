import { useTranslation } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import { selectInviteToken, selectUserToken } from "store/selectors/user";

import Button from "components/Button/Button";
import { ToastStatus, showToast } from "components/Toast/Toast";

function GetInviteLink() {
  const { t } = useTranslation();
  const inviteToken = useSelector(selectInviteToken);

  const handleClick = async () => {
    showToast({
      message: t("Invitation link copied!"),
      status: ToastStatus.SUCCESS,
    });
    const inviteLink = `https://${
      process.env.NEXT_PUBLIC_STAGE !== "production" ? "staging." : ""
    }gazzd.com/signup?invite_token=${inviteToken}`;
    navigator.clipboard.writeText(inviteLink);
  };

  return (
    <Button variant="ghost" size="smallFluid" onClick={handleClick}>
      {t("copy invitation link")}
    </Button>
  );
}

export default GetInviteLink;
