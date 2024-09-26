import { useTranslation } from "hooks";

import Icon from "components/Shared/Icon";

const MerchProductIcons = () => {
  const { t } = useTranslation();
  // Disabled for now
  return null;
  return (
    <div className="flex justify-between space-x-10 text-center mt-6 ">
      <div className="flex-col flex items-center justify-center space-y-4">
        <Icon type="growth" />
        <h4>{t("Eco-friendly products")}</h4>
      </div>
      <div className="flex-col flex items-center justify-center space-y-4">
        <Icon type="recycle" />
        <h4>{t("Recycled package material")}</h4>
      </div>
      <div className="flex-col flex items-center justify-center space-y-4">
        <Icon type="packaging" />
        <h4>{t("Climate neutral shipping")}</h4>
      </div>
    </div>
  );
};

export default MerchProductIcons;
