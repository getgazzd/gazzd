import BorderIcon from "components/Shared/Icon/BorderIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SocialmediaIcons from "./SocialmediaIcons";

const animation = {
  initial: { opacity: 0.4, x: -2 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -3 },
  transition: { duration: 0.125 },
};

function SocialmediaMobile() {
  const [toggled, setToggled] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<string>("");
  return (
    <div className="md:hidden">
      <div
        className="relative h-12 w-12 overflow-hidden "
        onClick={() => setToggled(!toggled)}
      >
        <motion.div
          transition={{ duration: 0.2 }}
          animate={toggled ? { y: -48 } : { x: 0 }}
        >
          <BorderIcon type="instagram" />
          <BorderIcon type="close" />
        </motion.div>
      </div>
      <motion.div
        className={`absolute bottom-12 flex h-12 w-auto`}
        {...animation}
      >
        <AnimatePresence>
          {toggled && <SocialmediaIcons setTooltipState={setTooltip} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SocialmediaMobile;
