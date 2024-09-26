import { motion } from "framer-motion";
import { useTranslation } from "hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, selectOrdersLoading } from "store/selectors/user";
import { _getOrders } from "store/thunks/user";

import Loading from "components/Loading/Loading";

import DashboardOrder from "./DashboardOrder";
import NoOrderDisclaimer from "./NoOrderDisclaimer";

const animation = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: -1 },
  exit: { opacity: 0, y: -2 },
  transition: { duration: 0.15 },
};
const OrdersDashboard: React.VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(_getOrders({}));
  }, []);
  const ordersLoading = useSelector(selectOrdersLoading);

  if (ordersLoading && orders?.length === 0) return <Loading />;

  if (!orders || orders?.length === 0)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[50vh]">
        <NoOrderDisclaimer />
      </div>
    );

  return (
    <motion.div className="md:p-6 md:space-y-8" {...animation} key="orderDisc">
      <h2 className="pt-4 pl-4 md:pt-0 md:pl-4">Your Orders</h2>
      <div
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 2fr" }}
        className="md:grid pt-8 mx-4 text-center hidden "
      >
        <h5 className="text-left">{t("product")}</h5>
        <h5>{t("quantity")}</h5>
        <h5>{t("date")}</h5>
        <h5>{t("status")}</h5>
        <h5>{t("order nr")}</h5>
        <h5>{t("amount")}</h5>
        <h5></h5>
      </div>
      <motion.div variants={container} initial="hidden" animate="show">
        {orders.map((order: any, index) => (
          <DashboardOrder key={order.order + index} order={order} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OrdersDashboard;

const container = {
  hidden: { opacity: 0.3 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};
