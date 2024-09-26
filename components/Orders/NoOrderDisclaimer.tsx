import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "hooks";
import { useSelector } from "react-redux";
import { selectVouchers } from "store/selectors/selection";

import Icon from "components/Shared/Icon";

const NoOrderDisclaimer = () => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        className="bg-gradient-to-r from-blueberryBlizz/20 to-blueberryBlizz/0 p-4"
        variants={mainAnimation}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <motion.div
          className="flex flex-col md:flex-row items-start bg-black/40 md:px-8 py-4 space-y-2 md:space-y-0"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
        >
          <motion.div className="pl-8 md:pl-0 mt-1" variants={textAnimation}>
            <Icon type="info" />
          </motion.div>
          <motion.div className="pl-8 md:pr-16" variants={textAnimation}>
            <p className="text-blueberryBlizz pb-1">
              {t("You don’t have any orders.")}
            </p>
            <p className="text-[12px]">
              {t(
                "Start earning and burning! You’ll get XP on every purchase made."
              )}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoOrderDisclaimer;

const mainAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const containerAnimation = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
const textAnimation = {
  hidden: { opacity: 0, x: 15 },
  show: { opacity: 1, x: 0 },
};
