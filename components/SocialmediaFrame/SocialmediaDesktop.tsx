import { motion, AnimatePresence } from "framer-motion";
import BorderIcon from "components/Shared/Icon/BorderIcon";
import { useState } from "react";
import SocialmediaIcons from "./SocialmediaIcons";

function SocialmediaDesktop() {
  const [isHovered, setHovered] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<string>("");

  return (
    <div className="relative hidden md:block">
      {isHovered && (
        <motion.div className="pointer-events-none absolute -top-12 left-16 flex h-12 w-auto items-center whitespace-nowrap px-4">
          <span>{tooltip}</span>
        </motion.div>
      )}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className=" h-16 w-16 cursor-pointer overflow-y-hidden"
      >
        <motion.div
          onHoverStart={() => setTooltip("we are social animals!")}
          transition={{ duration: 0.2 }}
          animate={isHovered ? { y: -64 } : { x: 0 }}
        >
          <BorderIcon type="instagram" />
          <BorderIcon type="flash" />
        </motion.div>

        <AnimatePresence>
          {isHovered && <SocialmediaIcons setTooltipState={setTooltip} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SocialmediaDesktop;
