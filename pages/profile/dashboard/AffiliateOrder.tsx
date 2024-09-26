import { Dialog } from "@headlessui/react";
import { formatDate } from "helpers/formatDate";
import { useTranslation } from "hooks";
import { useState } from "react";
import { SteamerOrder } from "types";

import Button from "components/Button/Button";

const AffiliateOrder = ({ order }: { order: SteamerOrder }) => {
  const orderDate = formatDate(order?.order_date);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleOrderInfo = () => {
    setModalIsOpen(true);
  };
  return (
    <>
      <div className="flex justify-between py-1 items-center">
        <Button
          variant="ghost"
          size="small"
          className="w-1/3 text-left !border-borderGray"
          onClick={handleOrderInfo}
        >
          #{order?.id}
        </Button>
        <h4 className="w-1/3 text-right">{orderDate}</h4>
        <h4 className="w-1/3 text-right">{order?.grand_total}</h4>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="flex flex-col justify-center items-center bg-black w-auto border border-borderGray p-16">
            <div className="flex flex-col divide-y divide-borderGray">
              {order?.products.map((product) => (
                <div key={product?.name} className="py-6">
                  <h4 className="text-center">{product?.name}</h4>
                  <h4 className="text-center opacity-50">
                    {t("Quantity: ")}
                    {product?.quantity}
                  </h4>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AffiliateOrder;
