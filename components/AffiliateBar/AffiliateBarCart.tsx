import { AnimatePresence, motion } from "framer-motion";

import { getAffiliateCookie } from "helpers/cookie";
import { getSteamer } from "store/transfers/react_query/steamer";
import { selectCurrency } from "store/selectors/selection";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "hooks";

const BarAnimationCart = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { delay: 0.5 } },
  exit: { x: -10, opacity: 0.1 },
};

interface Props {
  totalDiscount: number;
}

export const AffiliateCartBar = ({ totalDiscount }: Props) => {
  const { data, isLoading } = useQuery(["steamer"], getSteamer);
  const isOpen = true;
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const affiliate = getAffiliateCookie();

  if (isLoading || totalDiscount === 0 || !affiliate) return null;

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <motion.div
          key={data?.handle + "cart"}
          style={{ color: data?.accentColor }}
          className="relative border-t border-b text-[12px] border-borderGray h-12 flex items-center justify-between z-40 bar-cart-background"
          {...BarAnimationCart}
        >
          <div
            style={{
              color: data?.accentColor,
            }}
            className="h-full w-auto flex items-center z-auto select-text pl-2"
          >
            {t("10% of from ")}
            {data?.handle}
          </div>
          <div className="pr-2">
            -{Math.floor(totalDiscount) ?? ""} {currency ?? ""}
          </div>
        </motion.div>
      )}
      <style>{`
        .bar-cart-background::before {
          content: "";
          position: absolute;
          display: block;
          background: ${data?.accentColor};
          opacity: 5%;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </AnimatePresence>
  );
};
