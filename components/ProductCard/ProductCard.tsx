import { motion } from "framer-motion";
import Link from "next/link";
import { Product, RelatedProduct } from "types/product";

import ProductImage from "components/ProductImage/ProductImage";
import ProductPrice from "components/ProductPrice/ProductPrice";
import AddToCart from "components/Shared/Buttons/AddToCart/AddToCart";

import ProductPriceOff from "./ProductPriceOff";

export interface Props {
  product: Product | RelatedProduct;
}

const animation = {
  initial: { y: 7 },
  animate: { y: 0 },
};

const ProductCard = ({ product }: Props) => {
  return (
    <motion.div
      variants={animation}
      className="cursor-pointer relative"
      data-testid="productCard"
      key={product?.product}
    >
      <Link href={`/products/${product.uri}`} passHref>
        <a className="hover:no-underline">
          <ProductPriceOff product={product as Product} />
          <motion.div whileHover={{ y: -2 }}>
            <ProductImage product={product} className="p-2 md:p-6" />
          </motion.div>
          <div className="mt-4 mb-10 flex flex-col space-y-2">
            <h4>{product?.name}</h4>
            <ProductPrice product={product as Product} />
          </div>
        </a>
      </Link>
      <AddToCart variant="ghost" product={product} />
    </motion.div>
  );
};

export default ProductCard;
