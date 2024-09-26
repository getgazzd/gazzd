import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface Props {
  children?: ReactNode;
  handleClose: () => void;
}
const variant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const Backdrop = ({ children, handleClose }: Props) => {
  return (
    <motion.div
      data-testid="modal-backdrop"
      onClick={handleClose}
      variants={variant}
      initial="hidden"
      animate="show"
      exit="exit"
      // className="fixed inset-12 right-0 flex h-[calc(100vh-theme(space.24))] w-auto items-center justify-center md:inset-16 md:h-[calc(100vh-theme(space.32))]"
      className="fixed top-0 left-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-40"
      id="backdrop"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
