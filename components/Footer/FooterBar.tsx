import { useTranslation } from "hooks";
import Link from "next/link";

import BorderIcon from "components/Shared/Icon/BorderIcon";
import Seperator from "components/Shared/Seperator";
import SocialmediaFrame from "components/SocialmediaFrame";

const FooterBar = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="relative flex justify-start md:justify-end">
        <div className="absolute -ml-36 flex h-12 w-48 origin-top-right rotate-90 select-none items-center whitespace-nowrap md:-ml-48 md:h-16">
          <h4>{t("mix up your game")}</h4>
          <span className="ml-1 mb-1 text-[9px]">&trade;</span>
        </div>
      </div>
      <div className="glass-bg flex w-full flex-row items-center justify-between border-b border-t border-borderGray">
        <div className="box-content flex h-12 w-12 items-center justify-center border-r border-borderGray md:h-16 md:w-16">
          <SocialmediaFrame />
        </div>
        <div className="select-none space-x-3 text-[8px] sm:space-x-3 sm:text-[10px] md:space-x-5 md:text-base">
          <span>{t("Godlike flavors")}</span>
          <Seperator />
          <span>{t("Packed with energy")}</span>
          <Seperator />
          <span>{t("No bullshit!")}</span>
        </div>
        <div className="box-content flex h-12 w-12 items-center justify-center border-l border-borderGray md:h-16 md:w-16">
          <Link href="/profile" passHref>
            <a>
              <BorderIcon type="user" />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterBar;
