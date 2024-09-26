import { motion } from "framer-motion";

import BorderIcon from "components/Shared/Icon/BorderIcon";

interface Props {
  setTooltipState: (arg0: string) => void;
}

const socialediaContainerAnimation = {
  initial: { opacity: 0, x: -42 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -3 },
  transition: { duration: 0.2 },
};

function SocialmediaIcons({ setTooltipState }: Props) {
  return (
    <>
      <motion.div
        className="absolute top-0 left-12 flex h-12 w-auto border-t border-borderGray bg-black/80 md:left-16 md:h-16 md:border-0 md:bg-transparent md:pr-16"
        {...socialediaContainerAnimation}
      >
        <a target="blank" href="https://www.instagram.com/getgazzd/">
          <motion.div
            className="border-r border-borderGray"
            onHoverStart={() => setTooltipState("follow us forever")}
          >
            <BorderIcon type="instagram" />
          </motion.div>
        </a>

        <a target="blank" href="https://twitter.com/getGAZZD">
          <motion.div
            className="border-r border-borderGray"
            onHoverStart={() => setTooltipState("Tweeting so hard right now")}
          >
            <BorderIcon type="twitter" />
          </motion.div>
        </a>

        <a target="blank" href="https://www.tiktok.com/@getgazzd">
          <motion.div
            className="border-r border-borderGray"
            onHoverStart={() => setTooltipState("mix up your game!")}
            onHoverEnd={() => setTooltipState("")}
          >
            <BorderIcon type="tiktok" />
          </motion.div>
        </a>
        <a target="blank" href="https://discord.gg/gazzd">
          <motion.div
            className="border-r border-borderGray"
            onHoverStart={() => setTooltipState("join our discord dungeon!")}
            onHoverEnd={() => setTooltipState("")}
          >
            <BorderIcon type="discord" />
          </motion.div>
        </a>
      </motion.div>
    </>
  );
}

export default SocialmediaIcons;
