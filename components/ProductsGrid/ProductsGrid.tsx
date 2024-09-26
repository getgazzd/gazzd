import { motion } from "framer-motion";
import { Product, RelatedProduct } from "types/product";

import ProductCard from "../ProductCard/ProductCard";

export interface Props {
  products: Product[] | RelatedProduct[];
}

const animation = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const ProductsGrid = ({ products }: Props) => {
  return (
    <motion.div
      className="lg:0 grid max-w-7xl grid-cols-1 gap-12 px-2 md:px-10 md:grid-cols-2 lg:grid-cols-3"
      variants={animation}
      initial="initial"
      animate="animate"
      data-testid="productsGrid"
    >
      {products?.map((product) => (
        <ProductCard key={product?.product} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductsGrid;
