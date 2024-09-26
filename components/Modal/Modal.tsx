import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";

export interface Props {
  children?: ReactNode;
  handleClose: () => void;
  open: boolean;
}

const variant = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.125 } },
};

const Modal = ({ children, handleClose, open }: Props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <Backdrop handleClose={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={variant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed ml-12 flex  h-auto w-[75vw] overflow-auto border border-borderGray bg-black py-20 md:ml-0 md:h-1/2"
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
