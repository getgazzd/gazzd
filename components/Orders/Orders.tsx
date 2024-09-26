import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { components } from "generatedTypes";
import { useTranslation } from "hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, selectOrdersLoading } from "store/selectors/user";
import { _getOrders } from "store/thunks/user";

import Loading from "components/Loading/Loading";

import Order from "./Order";
import OrderCard from "./OrderCard";

interface Props {
  defaultOpen?: boolean;
}

const animation = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: -1 },
  exit: { opacity: 0, y: -2 },
  transition: { duration: 0.15 },
};
const Orders: React.VFC<Props> = ({ defaultOpen = false }) => {
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
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[310px] h-auto border border-borderGray flex justify-center items-center p-2">
          <p className="text-center">
            <span className="text-streakingStrawberries">W00t!?</span> You dont
            have any orders. Start earning and burning! <br />
            <br />
            You’ll get XP on every purchase made.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div className="mx-16 hidden md:block">
        <Disclosure defaultOpen={defaultOpen}>
          <Disclosure.Button
            data-testid="click"
            className={
              "bg-atomicApple h-[56px] w-full justify-center flex items-center"
            }
          >
            <h4 className="text-black">Click to see your orders</h4>
          </Disclosure.Button>
          <AnimatePresence>
            <Disclosure.Panel
              className="border border-atomicApple p-8"
              as={motion.div}
              {...animation}
              key="orderDisc"
            >
              <table className="w-auto table-auto text-[11px] md:w-full md:text-sm">
                <thead>
                  <tr>
                    {[
                      t("Product"),
                      t("Quantity"),
                      t("Date"),
                      t("Status"),
                      t("Order nr"),
                      t("Amount"),
                    ].map((item) => (
                      <th key={item} className="text-left md:p-8">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence>
                    {orders.map((order) => (
                      <Order key={order?.order} order={order} />
                    ))}
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
      <div className="md:hidden mx-4">
        <Disclosure>
          <Disclosure.Button
            className={
              "bg-atomicApple h-[56px] w-full justify-center flex items-center"
            }
          >
            <h4 data-testid="click" className="text-black ">
              Click to see your orders!
            </h4>
          </Disclosure.Button>
          <AnimatePresence>
            <Disclosure.Panel
              className="border border-atomicApple p-8"
              as={motion.div}
              {...animation}
              key="orderDiscMobile"
            >
              <motion.div
                className="flex flex-col"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence>
                  {orders.map((order) => (
                    <OrderCard key={order?.order} order={order} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </Disclosure.Panel>
          </AnimatePresence>
        </Disclosure>
      </div>
    </>
  );
};

export default Orders;

const container = {
  hidden: { opacity: 0.3 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};
