import { AnimatePresence, motion } from "framer-motion";
import { formatDate } from "helpers/formatDate";
import { useTranslation } from "hooks";

import DisclaimerBox from "components/DisclaimerBox";

import AffiliateOrder from "./AffiliateOrder";
import { useBackendUser } from "./useBackendUser";

const Earnings = () => {
  const { t } = useTranslation();
  const { totalEarnings, totalSales, percentOff, user, percentEarnings } =
    useBackendUser();
  const createdDate = user && formatDate(user?.created_at);
  const totalSalesFormatted = totalSales.toLocaleString("sv-SE");
  const totalEarningsFormatted = totalEarnings.toLocaleString("sv-SE");

  return (
    <AnimatePresence>
      <motion.div
        className="grid profile-container-grid h-full w-full"
        variants={earningsContainerAnimation}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="md:p-6 flex flex-col justify-between p-4 space-y-4"
          variants={earningsContainerAnimation}
          initial="hidden"
          animate="show"
        >
          <motion.h2 variants={earningsPanelAnimation}>
            {t("your total earnings")}
          </motion.h2>
          <motion.h3
            className="text-7xl md:text-[100px] whitespace-nowrap"
            style={{ color: user?.accentColor }}
            variants={earningsPanelAnimation}
          >
            {totalEarningsFormatted}
            <span className="text-[24px]">sek</span>
          </motion.h3>
        </motion.div>
        <motion.div
          className=" grid auto-rows-auto"
          variants={earningsPanelAnimation}
        >
          <div className="border md:border-t-0 border-borderGray p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              <h5>{t("Sales from your affiliate link")}</h5>
              <h5>
                {t("from")} {createdDate}
              </h5>
            </div>
            <h1>{totalSalesFormatted} sek</h1>
          </div>
          <div className="flex">
            <div className="border-l border-b border-r border-borderGray p-6 flex flex-col justify-between w-1/2">
              <h5>{t("Your cut from affiliate sales")}</h5>
              <h1>{percentEarnings}%</h1>
            </div>
            <div className="border-b border-borderGray p-6 flex flex-col justify-between w-1/2">
              <h5>{t("Follower Discount")}</h5>
              <h1>{percentOff}%</h1>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="border-t border-r border-borderGray flex flex-col justify-between"
          variants={earningsPanelAnimation}
        >
          <div className="flex items-center p-4 md:p-8 2xl:p-16 h-full">
            <DisclaimerBox
              title={"Did you know?"}
              information="You can use your earnings to buy products on the site."
            />
          </div>
          <div>
            {/* <div className="p-4 md:p-8 border-t border-borderGray"> */}
            {/* {totalEarnings < 1000 ? (
              <Button disabled size="smallFluid">
                <span className="text-[12px]">
                  {t("Send money when you’ve reached +1 000 sek")}
                </span>
              </Button>
            ) : (
              <Button size="smallFluid">{t("send me the cash")}</Button>
            )} */}
          </div>
        </motion.div>
        <motion.div
          className="p-5 overflow-y-scroll"
          variants={earningsPanelAnimation}
        >
          <h5>{t("Purchases made with your affiliate link")}</h5>
          <div className="pt-4">
            {user?.orders?.map((order, index) => (
              <AffiliateOrder
                key={"aff" + order.products + index}
                order={order}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Earnings;

const earningsContainerAnimation = {
  hidden: { opacity: 0.3 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const earningsPanelAnimation = {
  hidden: { opacity: 0, y: -13 },
  show: {
    opacity: 1,
    y: 0,
  },
};
