import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "hooks/useWindowSize";
import { ReactNode, useEffect } from "react";

export interface Props {
  open: boolean;
  handleClose: () => void;

  side?: "left" | "right";
  theme?: "light" | "dark";
  width?: "default" | "fluid";
  name: string;
  children?: ReactNode;
}
const SideBar = ({
  open,
  handleClose,
  side = "right",
  theme = "dark",
  width = "default",
  name,
  children,
}: Props) => {
  const variant = {
    closed: {
      y: side === "left" ? "10" : "-10",
      opacity: 0,
      transition: { duration: 0.25 },
    },
    open: { x: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: { x: 5 },
  };
  const backdropAnimation = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };
  const sidebarWidth =
    width === "default" ? "w-full md:max-w-[425px]" : "md:w-full";
  const gradient =
    theme === "dark"
      ? "bg-opacity-[90%] border-l border-borderGray"
      : "bg-gradient-to-t from-gray-50 to-gray-100 text-black";

  const { windowSize } = useWindowSize();

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          style={{ height: windowSize.height }}
          className=" z-40 fixed top-0 left-0 flex w-full h-full items-center justify-center "
          data-testid="sidebar"
        >
          <motion.div
            id="backdrop"
            variants={backdropAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
            key={name + "backdrop"}
          />

          <Dialog.Panel
            as={motion.div}
            onClick={(e: any) => e.stopPropagation()}
            className={`${gradient} ${sidebarWidth}  absolute top-0 z-50 flex h-full w-full items-start justify-center md:min-w-[425px] ${side === "left" ? "left-0" : "right-0"
              }`}
            key={name + "sidebar"}
            variants={variant}
            initial="closed"
            animate={open ? "open" : "closed"}
            exit="closed"
            transition={{
              type: "spring",
              damping: 20,
              mass: 0.75,
              restSpeed: 0.5,
            }}
          >
            <>{children}</>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
