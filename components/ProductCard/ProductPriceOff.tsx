import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useMoneySaved } from "helpers";
import { useTranslation } from "hooks";
import { useSelector } from "react-redux";
import { selectCurrency } from "store/selectors/selection";
import { getSteamer } from "store/transfers/react_query/steamer";
import { Product } from "types";

const animation = {
  initial: { x: 15, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { delay: 0.3 } },
};

interface Props {
  product: Product;
  accent?: string | undefined;
}

const ProductPriceOff = ({ product, accent }: Props) => {
  const moneySavedBundle =
    product?.bundleInfo?.priceOfItemsAsNumber &&
    product.priceAsNumber &&
    Math.round(
      product?.bundleInfo?.priceOfItemsAsNumber - product?.priceAsNumber
    );
  const moneySaved = useMoneySaved(product as Product);
  const { t } = useTranslation();
  const { data } = useQuery(["steamer"], getSteamer);

  const currency = useSelector(selectCurrency);

  if (product.collectionName === "Bundle")
    return (
      <AnimatePresence>
        <motion.div
          style={{
            background: accent
              ? accent
              : product.contentfulProduct?.accentColor,
          }}
          className=" w-auto inline-block  px-2 py-0.5 absolute  left-4 z-10"
          {...animation}
        >
          <h4 className="text-black">
            {t("SAVE")} {moneySavedBundle} {currency}
          </h4>
        </motion.div>
      </AnimatePresence>
    );
  return (
    <AnimatePresence>
      {product.discountPercent !== 0 && (
        <motion.div
          style={{ background: data?.accentColor }}
          className=" w-auto inline-block text-black px-2 py-0.5 absolute  left-4 z-10"
          {...animation}
        >
          <h4 className="text-black">
            {t("save")} {moneySaved} {currency}
          </h4>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPriceOff;
