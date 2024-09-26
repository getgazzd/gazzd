import { useTranslation } from "hooks";
import useVouchers from "hooks/useVouchers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserIsAuthenticated } from "store/selectors/user";

import Accordion from "components/Accordion/Accordion";
import Loading from "components/Loading/Loading";

import Voucher from "./Voucher";

const Vouchers = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { vouchers, loading, getVouchers, addVoucher, removeVoucher } =
    useVouchers(open);
  const isAuthenticated = useSelector(selectUserIsAuthenticated);

  useEffect(() => {
    if (open) getVouchers();
  }, [open]);

  return (
    <Accordion
      title={t("Buy with XP")}
      open={open}
      toggle={() => setOpen((prev) => !prev)}
    >
      {loading ? (
        <Loading />
      ) : vouchers.length > 0 ? (
        <div className="flex flex-col items-center gap-2 mt-6">
          {vouchers.map((voucher, index) => (
            <Voucher
              key={voucher.voucher}
              voucher={voucher}
              index={index}
              handleAdd={addVoucher}
              handleRemove={removeVoucher}
            />
          ))}
        </div>
      ) : (
        <h4>
          {isAuthenticated ? t("No vouchers to apply") : t("Sign in to use XP")}
        </h4>
      )}
    </Accordion>
  );
};

export default Vouchers;
