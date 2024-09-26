import { useTranslation } from "hooks";
import React from "react";

import ChangePassword from "components/ChangePassword";
import ProfileSettings from "components/ProfileSettings";
import TwitchAccount from "components/TwitchAccount";

import { useBackendUser } from "./useBackendUser";

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useBackendUser();
  return (
    <div className="flex w-full h-full flex-col md:flex-row">
      <div className="border-r border-borderGray md:w-1/2 h-full px-6 order-2 md:order-1">
        <h2 className="py-6 pb-4">{t("Profile Settings")}</h2>
        <ProfileSettings />
      </div>
      <div className="md:w-1/2 h-full md:order-2">
        <div className="flex justify-between flex-col border-b border-borderGray p-4 md:p-6 order-1">
          <h2 className="pb-8">{t("Your email")}</h2>
          <p className="text-[#5A5A5A]">{user?.email}</p>
        </div>
        <div className="flex justify-between flex-col border-b border-borderGray md:p-6 order-2">
          <TwitchAccount />
        </div>
        <div className="px-6 order-4">
          <h2 className="py-6 pb-4">{t("Change Password")}</h2>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Settings;
