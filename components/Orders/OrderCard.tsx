import { motion } from "framer-motion";
import { components } from "generatedTypes";
import { useTranslation } from "hooks";
import { useDispatch } from "react-redux";
import { addOrderToCart } from "store/thunks/cart";
import { Product } from "types";

import Button from "components/Button/Button";
import ProductImage from "components/ProductImage";

interface Props {
  order:
    | components["schemas"]["OrderModel"]
    | components["schemas"]["OrderCompleteModel"];
}

const OrderCard = ({ order }: Props) => {
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
    <motion.div
      className="w-full h-full flex flex-col items-center   py-8 border-b border-borderGray"
      variants={listItem}
      key={order.order}
    >
      <div className="flex w-full justify-around">
        <div
          className={`relative flex justify-center items-center ${
            order?.items && order?.items?.length > 1 && ""
          }`}
        >
          {order?.items?.map((item, index) => (
            <ProductImage
              key={item?.product?.product}
              product={item.product as Product}
              height={75}
              width={75}
              className={`z-0 ${
                index > 0
                  ? `md:left:2 absolute top-1 left-1 md:top-2 md:left-2`
                  : ""
              }`}
            />
          ))}
        </div>
        <div className="w-auto my-2">
          <h5>
            {t("amount")}: {order.totals?.grandTotalPrice}
          </h5>
          <h5>
            {t("date")}: {formatDate(order?.date)}
          </h5>
          <h5>
            {t("order nr")}: {order.order}
          </h5>
          <h5>
            {t("quantity")}: {order.items?.length}
          </h5>
        </div>
      </div>
      <div className="w-full py-2 mt-4 grid grid-cols-2 gap-2 place-items-center ">
        <div className="border border-borderGray h-full w-full flex justify-center items-center">
          {order?.status}
        </div>
        <div>
          <Button
            onClick={handleOrderAgain}
            variant="default"
            size="smallFluid"
            className="font-black"
          >
            {t("Order again")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;

const listItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};
