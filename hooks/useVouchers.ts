import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addVoucher as addVoucherThunk,
  removeVoucher as removeVoucherThunk,
} from "store/thunks/selection";
import { getVouchersAsync } from "store/transfers/checkout";

const useVouchers = (open: boolean) => {
  const [vouchers, setVouchers] = useState<
    { voucher: string; added: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) setVouchers([]);
  }, [open]);

  const addVoucher = (voucher: string) => {
    dispatch(addVoucherThunk(voucher));
    setAddedForVoucher(voucher, true);
  };

  const removeVoucher = (voucher: string) => {
    dispatch(removeVoucherThunk(voucher));
    setAddedForVoucher(voucher, false);
  };

  const setAddedForVoucher = (voucher: string, added: boolean) => {
    setVouchers((prev) => {
      const newVouchers = [...prev];
      const index = newVouchers.findIndex((v) => v.voucher === voucher);
      newVouchers[index].added = added;
      return newVouchers;
    });
  };

  const getVouchers = async () => {
    setLoading(true);
    const data = await getVouchersAsync();
    setVouchers(data);
    setLoading(false);
  };

  return {
    loading,
    vouchers,
    addVoucher,
    getVouchers,
    removeVoucher,
  };
};
export default useVouchers;
