import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { components } from "generatedTypes";
import { formatDate } from "helpers/formatDate";
import { useTranslation } from "hooks";
import { stringify } from "querystring";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrderToCart } from "store/thunks/cart";
import { Product } from "types/product";

import Button from "components/Button/Button";
import Loading from "components/Loading/Loading";
import ProductCard from "components/ProductCard/ProductCard";
import ProductImage from "components/ProductImage";

interface Props {
  order:
    | components["schemas"]["OrderModel"]
    | components["schemas"]["OrderCompleteModel"];
}

const DashboardOrder: React.VFC<Props> = ({ order }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderDate = order.date && formatDate(order?.date.toString());

  const handleOrderAgain = () => {
    dispatch(addOrderToCart(order));
  };

  if (!order) return <Loading />;
  return (
    <>
      <motion.div
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 2fr" }}
        className="md:grid border border-borderGray py-4 px-4 my-6 h-auto place-items-center overflow-y-scroll hidden"
        variants={listItem}
      >
        <motion.div
          className="relative max-w-[80px]"
          variants={imageContainerAnimation}
          initial="hidden"
          animate="show"
        >
          {order?.items?.map((item, index) => (
            <motion.div
              key={item?.product?.product}
              variants={imageAnimation}
              className={`z-0 origin-center ${
                index > 0
                  ? `md:left:2 absolute top-1 left-1 md:top-2 md:left-2`
                  : ""
              }`}
            >
              <ProductImage
                product={item.product as Product}
                height={400}
                width={400}
              />
            </motion.div>
          ))}
        </motion.div>
        <h5>{order?.totals?.totalQuantity}</h5>
        <h5>{orderDate}</h5>
        <h5>{order?.status}</h5>
        <h5>#{order?.order}</h5>
        <h5>{order?.totals?.grandTotalPrice}</h5>
        <div className=" flex items-center w-full justify-end mx-4 pr-4">
          <Button onClick={handleOrderAgain} variant="ghost" size="small">
            {t("Order again")}
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="w-full h-full flex flex-col items-center py-8 border-b border-borderGray md:hidden px-4"
        variants={listItem}
        key={order.order}
      >
        <motion.div
          className="flex w-full"
          variants={imageContainerAnimation}
          initial="hidden"
          animate="show"
        >
          <div
            className={`relative flex justify-center items-center w-1/2 ${
              order?.items && order?.items?.length > 1 && ""
            }`}
          >
            {order?.items?.map((item, index) => (
              <motion.div
                key={item?.product?.product}
                variants={imageAnimation}
                className={`z-0 origin-center ${
                  index > 0
                    ? `md:left:2 absolute top-1 left-1 md:top-2 md:left-2`
                    : ""
                }`}
              >
                <ProductImage
                  product={item.product as Product}
                  height={400}
                  width={400}
                />
              </motion.div>
            ))}
          </div>
          <div className="w-1/2 flex flex-col items-end space-y-1 justify-center my-2">
            <h5>
              {t("amount")}: {order.totals?.grandTotalPrice}
            </h5>
            <h5>
              {t("date")}: {orderDate}
            </h5>
            <h5>
              {t("order id")}: #{order?.order}
            </h5>
            <h5>
              {t("quantity")}: {order?.items?.length}
            </h5>
          </div>
        </motion.div>
        <div className="w-full py-2 mt-4 grid grid-rows-1 gap-4 ">
          <Button
            disabled
            variant="ghost"
            size="smallFluid"
            className="font-black"
          >
            {order?.status}
          </Button>
          <Button
            onClick={handleOrderAgain}
            variant="default"
            size="smallFluid"
            className="font-black"
          >
            {t("Order again")}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardOrder;

const listItem = {
  hidden: { opacity: 0, y: 33 },
  show: { opacity: 1, y: 0 },
};

const imageContainerAnimation = {
  hidden: { opacity: 0.3 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const imageAnimation = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0, transition: { ease: "backOut" } },
};
