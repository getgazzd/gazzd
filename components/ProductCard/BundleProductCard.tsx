import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { SteamerGradient } from "pages/steamer/[handle].page";
import { getBundle } from "store/transfers/react_query/bundle";
import { Product, RelatedProduct } from "types/product";
import { Steamer } from "types/steamer";

import ProductImage from "components/ProductImage/ProductImage";
import ProductPrice from "components/ProductPrice/ProductPrice";
import AddToCart from "components/Shared/Buttons/AddToCart/AddToCart";

import ProductPriceOff from "./ProductPriceOff";

export interface Props {
  product: Product | RelatedProduct;
  steamer?: Steamer;
}

const animation = {
  initial: { y: 7 },
  animate: { y: 0 },
};

const BundleProductCard = ({ product, steamer }: Props) => {
  const { data } = useQuery(["bundle"], () => getBundle(product as Product));
  return (
    <motion.div
      variants={animation}
      className="cursor-pointer relative"
      data-testid="BundleProductCard"
      key={product?.product}
    >
      <ProductPriceOff
        product={product as Product}
        accent={steamer?.accentColor}
      />
      <Link href={`/products/${product.uri}`} passHref>
        <motion.div whileHover={{ y: -2 }}>
          <ProductImage product={product} className="p-2 md:p-6" />
        </motion.div>
      </Link>
      <div className="mt-4 mb-10 flex flex-col space-y-2">
        <h4>{product?.name}</h4>

        <ProductPrice
          product={product as Product}
          accent={steamer?.accentColor}
        />
      </div>
      <AddToCart variant="ghost" product={product} />
    </motion.div>
  );
};

export default BundleProductCard;
