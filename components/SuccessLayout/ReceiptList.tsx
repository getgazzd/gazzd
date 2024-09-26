import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { components } from "generatedTypes";
import { useTranslation } from "hooks";
import React from "react";

import Button from "components/Button/Button";

import ReceiptItem from "./ReceiptItem";

const container = {
  hidden: { opacity: 0.3 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const animation = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: -1 },
  exit: { opacity: 0, y: -2 },
  transition: { duration: 0.15 },
};

interface Props {
  order: components["schemas"]["OrderModel"];
}

const ReceiptList = ({ order }: Props) => {
  const { t } = useTranslation();
  const formatDate = (date?: string) => {
    if (!date) return null;
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US");
  };

  return (
    <>
      <div className="md:mx-16 md:block w-full md:w-1/2 ">
        <Disclosure defaultOpen={false}>
          <Disclosure.Button className="w-full">
            <Button variant="ghost" size="smallFluid">
              Click to see your receipt
            </Button>
          </Disclosure.Button>
          <AnimatePresence>
            <Disclosure.Panel
              className="border border-white md:p-8 p-2"
              as={motion.div}
              {...animation}
              key="orderDisc"
            >
              <div className="pb-8 w-full border-b border-borderGray mb-4 ">
                <h5 className="text-gray-500 mx-auto text-center mb-1">
                  {t("This has also been sent to your email")}
                </h5>
                <h4 className="text-atomicApple text-center pb-4 md:text-[22px]">
                  {order?.address?.email}
                </h4>
                <div className="mb-3 space-y-0.5">
                  <h4>
                    {t("Order: ")} #{order?.order}
                  </h4>
                  <h4>
                    {t("Date: ")} {formatDate(order?.date)}
                  </h4>
                  <h4>
                    {t("Total:")} {order?.totals?.grandTotalPrice}
                  </h4>
                  <h4>
                    {t("Total products:")} {order?.totals?.totalQuantity}
                  </h4>
                </div>
                <div>
                  <h5>
                    {t("shipping with ")} {order?.shippingMethodName}
                  </h5>
                  <h5>{order?.shippingAddress?.address1}</h5>
                  <h5>
                    {order?.shippingAddress?.city}{" "}
                    {order?.shippingAddress?.zipCode}
                  </h5>
                </div>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <h4 className="text-atomicApple">Products</h4>
                </thead>
                <motion.tbody
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence>
                    {order?.items?.map((order) => {
                      return <ReceiptItem key={order?.item} order={order} />;
                    })}
                  </AnimatePresence>
                </motion.tbody>
              </table>
            </Disclosure.Panel>
          </AnimatePresence>
        </Disclosure>
        <style>
          {`
           thead tr:first-child th { position: sticky; top: 64px; background:rgba(0,0,0,0.9); z-index: 10;}
          `}
        </style>
      </div>
    </>
  );
};

export default ReceiptList;
