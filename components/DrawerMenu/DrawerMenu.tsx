import { closeDrawerMenu, drawerMenuOpen } from "store/slices/drawerMenu";
import { useDispatch, useSelector } from "react-redux";

import { AnimatePresence } from "framer-motion";
import BorderIcon from "components/Shared/Icon/BorderIcon";
import Link from "next/link";
import { Portal } from "@headlessui/react";
import SideBar from "components/SideBar/";
import { selectDrawerMenuOpen } from "store/selectors/drawerMenu";
import { useCategories } from "store/transfers/react_query/categories";
import { useEffect } from "react";
import { useTranslation } from "hooks/useTranslation";

function DrawerMenu() {
  const { t } = useTranslation();
  const open = useSelector(selectDrawerMenuOpen);
  const dispatch = useDispatch();
  const openMenu = () => dispatch(drawerMenuOpen());
  const closeMenu = () => dispatch(closeDrawerMenu());

  const { data: categoriesData } = useCategories();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <>
      <div
        data-testid="drawerMenu"
        onClick={!open ? () => openMenu() : () => closeMenu()}
        className={`z-10 cursor-pointer select-none justify-center border-r border-borderGray hover:bg-gray-900`}
      >
        {!open ? (
          <BorderIcon type="menu" />
        ) : (
          <>
            <BorderIcon className="hidden" type="menu" />
            <Portal>
              <div className="fixed top-0 left-0 z-50 cursor-pointer">
                <BorderIcon type="close" />
              </div>
            </Portal>
          </>
        )}
      </div>
      <AnimatePresence exitBeforeEnter>
        <SideBar
          name="menu"
          open={open}
          width="fluid"
          side="left"
          handleClose={closeMenu}
        >
          <div className="flex h-full w-full flex-col justify-between bg-black bg-opacity-95 p-14 md:p-16">
            <div className="flex h-auto flex-col justify-between md:h-auto">
              <div className="flex flex-col">
                <Link href="/products">
                  <a className={headerItemStyleMain}>{t("Shop all")}</a>
                </Link>

                {categoriesData?.categories?.map((category) => {
                  if (category.uri === "portion") return null;
                  return (
                    <Link
                      key={category.uri}
                      href={`/products?category=${category.uri}`}
                    >
                      <a className={headerItemStyleMain}>
                        {t(String(category?.name?.[0]))}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-1 flex-col pt-8 md:pt-0 justify-between md:flex-row md:items-end">
              <div className="flex flex-col">
                <div>
                  <Link href="/gazzadors">
                    <a className={headerItemStyle}>{t("our gazzadors")}</a>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col text-right">
                {/* Disabled for now
                <Link href="/page/faq">
                  <a className={headerItemStyle}>{t("faq")}</a>
                </Link> */}
                <Link href="/page/about">
                  <a className={headerItemStyle}>{t("about")}</a>
                </Link>
                <Link href="/contact">
                  <a className={headerItemStyle}>{t("contact")}</a>
                </Link>
              </div>
            </div>
          </div>
        </SideBar>
      </AnimatePresence>
    </>
  );
}

export default DrawerMenu;

const headerItemStyleMain =
  "text-[40px] font-bold leading-[48px] md:text-[64px] md:leading-[64px] lg:text-[82px] lg:leading-[82px]  xl:text-[100px] xl:leading-[100px] whitespace-nowrap";

const headerItemStyle =
  "text-[32px] font-bold leading-[38px] lg:text-[46px] lg:leading-[46px] xl:text-[60px] xl:leading-[60px]";
