import { useTranslation, useUserAuthentication } from "hooks";

import Button from "components/Button/Button";
import InviteFriend from "components/InviteFriend/InviteFriend";
import ProfileXP from "components/ProfileXP/ProfileXP";

const ProfileSidebar = () => {
  const { logoutUser } = useUserAuthentication();
  const { t } = useTranslation();

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="flex flex-col justify-between">
      <div className="px-6">
        <ProfileXP />
        <InviteFriend />
      </div>
      <div className="pt-8 border-t border-borderGray px-6 bottom-8 relative">
        <Button onClick={handleLogout} variant="ghost" size="smallFluid">
          {t("log out")}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
