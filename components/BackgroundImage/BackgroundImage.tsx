import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";

import Gradient from "components/Gradient";
import Image from "next/image";
import { Product } from "types";
import { Steamer } from "types/steamer";
import gazzadors from "public/images/backgrounds-pages/gazzadors.svg";
import landing from "public/images/backgrounds-pages/gazzd.png";
import products from "public/images/backgrounds-pages/productsBackground.svg";
import profile from "public/images/backgrounds-pages/profile.png";
import { useWindowSize } from "hooks/useWindowSize";

export interface Props {
  page?: "products" | "landing" | "gazzadors" | "profile";
  product?: Product;
  steamer?: Steamer;
  source?: any;
  fixed?: boolean;
  fluid?: boolean;
}

const animation = {
  initial: { opacity: 0, scale: 1.2 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { delay: 0.33, duration: 0.33 },
};

const BackgroundImage = ({ page, product, steamer, source }: Props) => {
  const { scrollY } = useViewportScroll();
  const { documentSize, windowSize } = useWindowSize();

  const bgScale = useTransform(scrollY, [0, documentSize.height], [1, 1.15]);

  let src;

  if (product) {
    src = product.contentfulProduct?.pageBackground.fields.file.url;
  } else {
    switch (page) {
      case "products":
        src = products;
        break;
      case "gazzadors":
        src = gazzadors;
        break;
      case "profile":
        src = profile;
        break;
      default:
        src = landing;
        break;
    }
  }
  if (steamer) {
    src = steamer.vectorBackground.fields.file.url;
  }
  if (source) {
    src = source.file.url;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 top-0 z-[-1] transition-all duration-700 md:transition-none"
        {...animation}
        style={{ height: windowSize.height, width: windowSize.width }}
      >
        <motion.div
          className="w-full h-full bottom-0"
          style={{
            scale: bgScale,
          }}
          data-testid="background"
        >
          <Image
            alt="background image"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            src={product || steamer || source ? "https:" + src : src}
          />
        </motion.div>
        {!product && <Gradient />}
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundImage;
