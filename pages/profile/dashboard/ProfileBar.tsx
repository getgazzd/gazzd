import { AffiliateAvatar } from "components/AffiliateBar/AffiliateAvatar";
import { useBackendUser } from "./useBackendUser";
import { useTranslation } from "hooks";

const ProfileBar = () => {
  const { user } = useBackendUser();
  const { t } = useTranslation();
  const accent = user?.accentColor ? user.accentColor : "#3344FF";

  return (
    <div
      style={{ color: accent }}
      className="h-12 w-full md:border-t border-b md:border-b-0 border-borderGray flex items-center text-[12px] pl-2"
    >
      <span className="text-white pr-1">{t("you are killing it ")}</span>

      {user && user.fullName}
    </div>
  );
};

export default ProfileBar;
