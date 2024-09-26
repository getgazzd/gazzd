import { useTranslation } from "hooks";

import Icon from "components/Shared/Icon";

const SocialMediaBar = () => {
  const { t } = useTranslation();
  // Disabled for npow
  return null;
  return (
    <div className="flex justify-between w-full items-center">
      <h5>{t("share")}</h5>
      <div className="grid grid-cols-6 gap-2">
        <Icon type="facebook" height={20} width={20} />
        <Icon type="twitter" height={20} width={20} />
        <Icon type="reddit" height={20} width={20} />
        <Icon type="sent" height={20} width={20} />
        <Icon type="pinterest" height={20} width={20} />
        <Icon type="weibo" height={20} width={20} />
      </div>
    </div>
  );
};

export default SocialMediaBar;
