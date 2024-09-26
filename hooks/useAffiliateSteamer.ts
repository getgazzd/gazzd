import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMarket } from "store/selectors/selection";
import { updateSelection } from "store/thunks/selection";
import { getMarkets } from "store/transfers/react_query/markets";
import { getSteamer } from "store/transfers/react_query/steamer";

export const useAffiliateSteamer = () => {
  const { data: marketData } = useQuery(["markets"], getMarkets);
  const { data: steamerData } = useQuery(["steamer"], getSteamer);
  const market = useSelector(selectMarket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (steamerData?.market !== market?.toString()) {
      if (marketData?.markets?.find((m) => m.market === steamerData?.market)) {
        dispatch(updateSelection({ market: steamerData?.market }));
        console.log("MARKET SET", steamerData?.market);
      }
    } else {
      const defaultMarket = marketData?.markets?.find(
        (m) => m.default === true
      );
      dispatch(updateSelection({ market: defaultMarket?.market }));
      console.log("DEFAULT MARKET SET");
    }
  }, []);

  return {};
};
