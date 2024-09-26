import { AnimatePresence, motion } from "framer-motion";

const animation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  toggle: () => void;
}

const Accordion = ({ children, title, open, toggle }: Props) => {
  return (
    <motion.div>
      <motion.header
        className="flex w-full cursor-pointer select-none items-center justify-between"
        onClick={toggle}
      >
        <h3 className="">{title}</h3>
        <h3 className="w-8 text-right">{open ? "-" : "+"}</h3>
      </motion.header>
      <AnimatePresence>
        {open && <motion.section {...animation}>{children}</motion.section>}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;
