import { FreeShippingLimitKey, freeShippingLimits } from "helpers/shippings";
import { useTranslation } from "hooks";
import { useSelector } from "react-redux";
import { selectCurrency } from "store/selectors/selection";
import { Totals } from "types";

export const ShippingCost = ({ totals }: { totals: Totals }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);

  const freeShippingLimit =
    freeShippingLimits[currency as FreeShippingLimitKey];

  if (totals.grandTotalPriceAsNumber === 0) return null;
  if (totals.itemsTotalPriceAsNumber < freeShippingLimit) {
    return (
      <div className="flex flex-col  items-start justify-start">
        <h5>
          {t("shipping:")} {totals.shippingPrice}
        </h5>
        <h5>
          {t("spend")}{" "}
          {freeShippingLimit - Math.round(totals.itemsTotalPriceAsNumber)}{" "}
          {currency + t(" more for free delivery")}
        </h5>
      </div>
    );
  }
  return <h5 className="text-atomicApple">{t("free delivery rewarded!")}</h5>;
};
