import { AnimatePresence, motion } from "framer-motion";
import { getAffiliateCookie } from "helpers/cookie";
import { itemsAreOnlyBundles } from "helpers/selection";
import { ICentraCheckout } from "hoc/CentraCheckoutHandler/CentraCheckoutHandler";
import { useTranslation } from "hooks";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "store/selectors/cart";
import {
  selectSelectionIsLoading,
  selectVouchers,
} from "store/selectors/selection";
import { addVoucher, removeAllVouchers } from "store/thunks/selection";

import Button from "components/Button/Button";

import { VoucherButton } from "./VoucherButton";

const animation = {
  initial: { opacity: 0.75, y: 7 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.2, y: -5 },
  transition: { duration: 0.15, ease: "easeOut" },
};

declare const CentraCheckout: ICentraCheckout;

const VoucherInput = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [voucher, setVoucher] = useState("");
  const addedVouchers = useSelector(selectVouchers);
  const loading = useSelector(selectSelectionIsLoading);
  const affiliateCookie = getAffiliateCookie();
  const cart = useSelector(selectCart);

  const hasVouchers = addedVouchers && addedVouchers.length > 0;

  const dispatch = useDispatch();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setVoucher(event?.currentTarget?.value);
  };

  const suspendCheckout = () =>
    CentraCheckout?.suspend && CentraCheckout.suspend();

  const resumeCheckout = () =>
    CentraCheckout?.resume && setTimeout(CentraCheckout.resume, 500);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    suspendCheckout();
    dispatch(addVoucher(voucher));
  };

  const handleRemove = async () => {
    suspendCheckout();
    dispatch(removeAllVouchers());
  };

  const hasOnlyBundle = itemsAreOnlyBundles(cart?.selection?.items);

  useEffect(() => {
    if (hasVouchers && isOpen) {
      setVoucher("");
      setIsOpen(false);
    }
  }, [hasVouchers]);

  useEffect(() => {
    if (!loading) resumeCheckout();
  }, [loading]);

  const a = loading ? {} : animation;
  return (
    <div className="w-full relative">
      <VoucherButton
        hasVouchers={hasVouchers}
        hasOnlyBundle={hasOnlyBundle}
        open={isOpen}
        handleOpen={() => setIsOpen((prev) => !prev)}
        handleRemove={handleRemove}
      />

      <AnimatePresence>
        {isOpen && !loading && !hasVouchers && !affiliateCookie && (
          <motion.div
            className="absolute w-full bg-black/90 border border-gray-50 transform origin-bottom-left top-[-220%] md:top-[-180%]"
            {...a}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 p-2">
                  <input
                    value={voucher}
                    onChange={handleChange}
                    className="bg-black w-full"
                    placeholder="Enter code..."
                    autoFocus
                  />
                </div>
                <div className="flex flex-1 md:flex-none">
                  <Button size="smallFluid" type="submit">
                    {t("use code")}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoucherInput;
