import { AnimatePresence, motion } from "framer-motion";
import { useMoneySaved } from "helpers";
import { useTranslation } from "hooks";
import useCurrentProduct from "hooks/useCurrentProduct";
import { Product } from "types";

const animation = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { delay: 0.3 } },
};
const PriceOffProductLayout = ({ product }: { product: Product }) => {
  const { currentProduct } = useCurrentProduct(product);
  const moneySaved = useMoneySaved(currentProduct as Product);
  const { t } = useTranslation();
  if (!product || moneySaved === "0") return null;
  return (
    <AnimatePresence>
      <motion.h2
        style={{
          background: product.contentfulProduct.accentColor,
        }}
        className="absolute text-black inline-block px-1.5 py-0.5"
        {...animation}
      >
        {t("SAVE")} {moneySaved} {t("SEK")}
      </motion.h2>
    </AnimatePresence>
  );
};

export default PriceOffProductLayout;
