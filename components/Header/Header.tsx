import { FreeShippingLimitKey, freeShippingLimits } from "helpers/shippings";
import useTranslation from "hooks/useTranslation";
import { useUserAuthentication } from "hooks/useUserAuthentication";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrency } from "store/selectors/selection";

import DrawerCart from "components/Cart/DrawerCart";
import DrawerMenu from "components/DrawerMenu";
import ProgressBar from "components/ProgressBar/ProgressBar";
import Logotype from "components/Shared/Logotype";
import Seperator from "components/Shared/Seperator";

const Header = () => {
  const { isAuthenticated, logoutUser, getUser } = useUserAuthentication();

  // TODO: Move this to a more appropriate Component
  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  const authCallback = (path: string): void => {
    if (path === "/") {
      logoutUser();
    }
  };

  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);

  const freeShippingLimit =
    freeShippingLimits[currency as FreeShippingLimitKey];

  return (
    <div className="" data-testid="header">
      <div className="glass-bg absolute inset-0 z-50 flex h-12 flex-row items-center justify-between border-b border-borderGray md:h-16">
        <DrawerMenu />
        <div className="relative flex h-[100%] flex-1 select-none items-center justify-center space-x-3 text-[8px] sm:space-x-3 sm:text-[10px] md:space-x-5 md:text-base">
          {isAuthenticated ? (
            <ProgressBar />
          ) : (
            <>
              <span>
                {t("Free delivery over ") + freeShippingLimit + " " + currency}
              </span>
            </>
          )}
        </div>
        <DrawerCart />
      </div>
      <div className="absolute z-50 mt-10 flex w-12 justify-center px-3 py-5 md:mt-16 md:w-16 md:px-0 ">
        <Logotype />
      </div>
    </div>
  );
};

export default Header;
