import { motion } from "framer-motion";
import { useTranslation } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrency } from "store/selectors/selection";
import { SelectionItem } from "types";

interface Props {
  order: SelectionItem;
}

const ReceiptItem: React.VFC<Props> = ({ order }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);

  return (
    <motion.tr
      variants={listItem}
      key={order?.item}
      className="text-right md:p-8 border-b border-borderGray z-0 h-12"
    >
      <td className="text-left">
        <h5>{order?.product?.name}</h5>
      </td>
      <td className="text-center">
        <h5>x {order?.quantity}</h5>
      </td>

      <td className="text-right">
        {order?.totalPriceAsNumber} {currency}
      </td>
    </motion.tr>
  );
};

export default ReceiptItem;

const listItem = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.15 } },
};
