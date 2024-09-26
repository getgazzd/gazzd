import { useState } from "react";
import { Document } from "@contentful/rich-text-types";
import DynamicContent from "components/DynamicContent";
import { motion, AnimatePresence } from "framer-motion";
interface Props {
  title: string;
  content: Document;
}

const animation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const FAQItem = ({ content, title }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div>
      <motion.header
        className="flex w-full cursor-pointer select-none justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="mb-3">{title}</h3>
        <h3 className="w-8 text-right">{isOpen ? "-" : "+"}</h3>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.section {...animation}>
            <DynamicContent content={content} />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
