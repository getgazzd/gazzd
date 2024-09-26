import { Menu } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "hooks";
import Link from "next/link";

import Icon from "components/Shared/Icon";

const animation = {
  initial: { y: -5, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -2, opacity: 0 },
};

const ProfileMenu = () => {
  const { t } = useTranslation();
  return (
    <Menu as="div" className="relative top-3">
      <Menu.Button className="inline-flex w-full justify-end items-end">
        <Icon type="more" width={25} />
      </Menu.Button>
      <AnimatePresence>
        <Menu.Items
          as={motion.div}
          className="absolute right-0 w-44 origin-top-right bg-white border border-borderGray"
          {...animation}
          key="submenuProfile"
        >
          <Menu.Item
            as="div"
            className={"text-black cursor-pointer p-2 w-full text-center"}
          >
            <Link passHref href="/profile/history">
              <span className="font-bold text-md">{t("order history")}</span>
            </Link>
          </Menu.Item>
        </Menu.Items>
      </AnimatePresence>
    </Menu>
  );
};

export default ProfileMenu;
