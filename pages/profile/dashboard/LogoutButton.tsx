import { useTranslation } from "hooks/useTranslation";
import { useUserAuthentication } from "hooks/useUserAuthentication";

import Button from "components/Button/Button";

const LogoutButton = () => {
  const { logoutUser } = useUserAuthentication();
  const { t } = useTranslation();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Button onClick={handleLogout} variant="ghost" size="smallFluid">
      {t("log out")}
    </Button>
  );
};

export default LogoutButton;
