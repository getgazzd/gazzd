import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBackendUser } from "store/selectors/user";
import { BackendUser, SteamerOrder } from "types";

export const useBackendUser = () => {
  const user: BackendUser | null = useSelector(selectBackendUser);
  const percentOff = user?.percentOff;
  const percentEarnings = user?.percentEarnings ?? 10;
  const isSteamer = user?.role === "steamer";

  const totalSales = isSteamer
    ? user?.orders.reduce(
        (total: number, order: SteamerOrder) => total + order.total,
        0
      )
    : 0;

  const totalEarnings =
    isSteamer && percentEarnings
      ? Math.round(totalSales * (percentEarnings / 100))
      : 0;

  return {
    totalEarnings,
    totalSales,
    percentOff,
    percentEarnings,
    user,
    isSteamer,
  };
};
