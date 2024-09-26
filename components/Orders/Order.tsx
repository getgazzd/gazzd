import { motion } from "framer-motion";
import { components } from "generatedTypes";
import { useTranslation } from "hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { addOrderToCart } from "store/thunks/cart";
import { Product } from "types/product";

import Button from "components/Button/Button";
import ProductImage from "components/ProductImage";

interface Props {
  order:
    | components["schemas"]["OrderModel"]
    | components["schemas"]["OrderCompleteModel"];
}

const Order: React.VFC<Props> = ({ order }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formatDate = (date?: string) => {
    if (!date) return null;
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US");
  };

  const handleOrderAgain = () => {
    dispatch(addOrderToCart(order));
  };

  return (
    <motion.tr
      variants={listItem}
      key={order?.order}
      className="text-right md:p-8 border-b border-borderGray z-0 "
    >
      <Cell>
        <div
          className={`relative ${
            order?.items &&
            order?.items?.length > 1 &&
            "pr-1 pb-1 md:pr-2 md:pb-2"
          }`}
        >
          {order?.items?.map((item, index) => (
            <ProductImage
              key={item?.product?.product}
              product={item.product as Product}
              height={100}
              width={100}
              className={`z-0 ${
                index > 0
                  ? `md:left:2 absolute top-1 left-1 md:top-2 md:left-2`
                  : ""
              }`}
            />
          ))}
        </div>
      </Cell>
      <Cell>{order?.totals?.totalQuantity}</Cell>
      <Cell>{formatDate(order?.date)}</Cell>
      <Cell>{order?.status}</Cell>
      <Cell>#{order?.order}</Cell>
      <Cell>{order?.totals?.grandTotalPrice}</Cell>
      <Cell>
        <Button
          onClick={handleOrderAgain}
          variant="default"
          size="smallFluid"
          className="font-black"
        >
          {t("Order again")}
        </Button>
      </Cell>
    </motion.tr>
  );
};

export default Order;

const Cell = ({ children }: { children: any }) => (
  <td className="pr-4 text-left">{children}</td>
);

const listItem = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.15 } },
};
