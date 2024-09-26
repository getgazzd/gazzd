import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { deleteCookie } from "helpers/cookie";
import { useTranslation } from "hooks";
import { LAST_VISIT, useAffiliateRouting } from "hooks/useAffiliateRouting";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSteamer } from "store/transfers/react_query/steamer";

import Button from "components/Button/Button";

import { AffiliateAvatar } from "./AffiliateAvatar";

const BarAnimation = {
  initial: { y: -11, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 1 } },
  exit: { y: 5, opacity: 0.1 },
};

const AffiliateBar = () => {
  const { data, isLoading } = useQuery(["steamer"], getSteamer);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  let [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { redirectToMainDomain, domain } = useAffiliateRouting();

  const unfollowConfirmed = () => {
    deleteCookie(domain);
    localStorage.removeItem(LAST_VISIT);
    setIsOpen((prev) => !prev);
    setTimeout(redirectToMainDomain, 200);
  };

  const onClickHandler = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (router.pathname === "/checkout") setIsOpen(false);
    if (router.pathname.startsWith("/steamer")) setIsOpen(false);
    if (router.pathname.startsWith("/profile")) setIsOpen(false);
  }, []);
  if (isLoading || !data) return null;

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <motion.div
          key={data?.handle}
          style={{ color: data?.accentColor }}
          className="absolute top-12 md:top-16 border-b text-[12px] md:text-[14px] border-borderGray h-12 affiliate-frame flex items-center justify-between z-40 bar-background"
          {...BarAnimation}
        >
          <div className="flex justify-center h-full w-auto z-auto">
            <AffiliateAvatar steamer={data} />
            <div
              style={{
                color: data?.accentColor,
              }}
              className="h-full w-auto flex items-center z-auto select-text"
            >
              {data?.handle} is now giving you {data?.percentOff}% off on
              everything you buy!
            </div>
          </div>
          <div
            className="flex items-center justify-center h-5 cursor-pointer"
            onClick={onClickHandler}
          >
            <h5 style={{ color: data.accentColor }}>Unsupport</h5>
            <div className="w-3 h-3 mr-4 cursor-pointer z-40 flex flex-row ml-1">
              <ColoredCross />
            </div>
          </div>
        </motion.div>
      )}
      <Dialog
        open={isModalOpen}
        onClose={() => setModalIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="flex flex-col justify-center items-center p-4">
            <Dialog.Title>
              <h1 className="text-center">
                {t("Are you sure?!")}
                <br />
                <br />
                {t("you wont support ")}
                <span style={{ color: data.accentColor }}>{data.handle}</span>
                {t(" anymore! =(")}
              </h1>
            </Dialog.Title>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 mt-8 md:space-y-0">
              <Button size="small" variant="ghost" onClick={unfollowConfirmed}>
                {t("yes I'm sure")}
              </Button>
              <Button
                size="small"
                variant="ghost"
                customColor={data.accentColor}
                onClick={() => setModalIsOpen(false)}
              >
                {"no, I will keep supporting"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <style>{`
        .bar-background:before {
          content: "";
          background: ${data?.accentColor};
          opacity: 5%;
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default AffiliateBar;

export const ColoredCross = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        d="M5.5 4.08594L4.08594 5.5L4.79688 6.20313L14.5859 16L4.08594 26.5L5.5 27.9141L16 17.4141L25.7891 27.2109L26.5 27.9141L27.9141 26.5L27.2109 25.7891L17.4141 16L27.9141 5.5L26.5 4.08594L16 14.5859L6.20313 4.79688L5.5 4.08594Z"
        fill="currentColor"
      />
    </svg>
  );
};
