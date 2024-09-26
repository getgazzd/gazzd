import { motion, usePresence } from "framer-motion";
import { usePriceParser } from "helpers/usePriceParser";
import useCurrentProduct from "hooks/useCurrentProduct";
import Image from "next/image";
import Link from "next/link";
import { Product } from "types";
import { Item } from "types/cart";

import CartQuantity from "../CartQuantity";

export interface Props {
  item: Item;
}

const transition = {
  type: "spring",
  stiffness: 800,
  damping: 45,
};

const CartItem = ({ item }: Props) => {
  const [isPresent, safeToRemove] = usePresence();

  const { currentProduct } = useCurrentProduct(item.product as Product);
  const animation = {
    layout: true,
    initial: "out",
    animate: isPresent ? "in" : "out",
    variants: {
      out: { opacity: 0, scale: 0.6 },
      in: { opacity: 1, scale: 1 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove?.(),
    transition,
  };
  const totalPrice = usePriceParser(item?.totalPrice as string);
  const totalPriceBeforeDiscount = usePriceParser(
    item?.totalPriceBeforeDiscount as string
  );

  return (
    <motion.div
      {...animation}
      className=" flex flex-row border-b border-borderGray py-4 pr-4"
      data-testid="cartItem"
    >
      <Link href={`/products/${item?.product?.uri}`} passHref>
        <a className="p-4">
          <Image
            // @ts-ignore
            src={item?.product?.media?.standard[0]}
            alt={item?.product?.description}
            width={195}
            height={195}
            objectFit="contain"
            priority={true}
          />
        </a>
      </Link>
      <div className="flex w-full flex-col justify-evenly">
        {item.size ? (
          <h5>
            {item?.product?.name} - {item?.size}
          </h5>
        ) : (
          <h5>{item?.product?.name}</h5>
        )}
        {currentProduct?.discountPercent !== 0 ? (
          <>
            <div className="flex md:flex-row md:items-end md:space-x-2 flex-col items-start justify-start space-x-0">
              <h2>{totalPrice}</h2>
              <span className="text-md line-through text-[#5A5A5A]">
                {totalPriceBeforeDiscount}
              </span>
            </div>
          </>
        ) : (
          <h2>{totalPrice}</h2>
        )}
        <CartQuantity item={item} />
      </div>
    </motion.div>
  );
};

export default CartItem;
