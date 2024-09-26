import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "hooks";
import { Order, Product } from "types";

import ProductImage from "components/ProductImage";

import ReceiptList from "./ReceiptList";

const animation = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
};

interface Props {
  order: Order;
}
const SuccessLayout = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="mt-16">{t("This is now yours")}</h3>
      <div className="flex flex-col md:flex-wrap md:flex-row justify-center">
        <AnimatePresence>
          {order?.items?.map((order, index: number) => {
            return (
              <motion.div
                className="p-8 space-y-2 md:w-1/4"
                key={order.item}
                {...animation}
                transition={{ duration: 0.175, delay: 0.15 * index }}
              >
                <ProductImage product={order?.product as Product} />
                <h4 className="text-center">
                  {order?.quantity} x {order?.product?.name}
                </h4>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="w-full container flex justify-center mt-16">
        <ReceiptList order={order} />
      </div>
    </>
  );
};

export default SuccessLayout;
