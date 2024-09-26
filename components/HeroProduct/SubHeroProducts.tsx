import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubHeroProduct from "./SubHeroProduct";
import { SubProduct } from "types";
import { getContentfulSubHeroProducts } from "store/transfer/contentful";
import { getProducts } from "store/thunks/products";
import { selectProducts } from "store/selectors/products";
import useFilters from "hooks/useFilters";

const animation = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 0.7 } },
  exit: {},
};

const SubHeroProducts = (content: any) => {
  const [subHeroProductsArray, setSubHeroProducts] = useState<SubProduct[]>(
    content.products
  );
  const { args } = useFilters();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts(args));
    (async () => {
      await getContentfulSubHeroProducts();
    })();
  }, []);

  return (
    <AnimatePresence>
      {subHeroProductsArray?.length === 0 ? null : (
        <motion.div
          {...animation}
          className="grid w-full px-0 divide-x divide-borderGray border-t border-borderGray md:mt-0 md:grid-cols-2"
        >
          {subHeroProductsArray.reverse().map((subProduct: SubProduct) => {
            const product = products.filter(
              (product) =>
                product.uri === subProduct.fields.product[0].fields.slug
            );

            return (
              <SubHeroProduct
                subProduct={subProduct}
                product={product[0]}
                key={subProduct.fields.buttonLink}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubHeroProducts;
