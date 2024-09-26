import { Document } from "@contentful/rich-text-types";
import { AnimatePresence } from "framer-motion";
import FAQItem from "./FAQItem";

interface Props {
  content: Document;
}

const FAQList = ({ content }: Props) => {
  return (
    <>
      <div className="max-w-4xl space-y-6">
        <AnimatePresence>
          {content instanceof Array
            ? content?.map((item) => {
                return (
                  <FAQItem
                    key={item.sys.id}
                    title={item.fields.title}
                    {...item.fields}
                  />
                );
              })
            : ""}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FAQList;
