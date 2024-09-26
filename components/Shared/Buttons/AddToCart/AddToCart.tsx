import { EVENTS, trackEvent } from "helpers/trackEvents";
import { useCheckStock } from "hooks/useProductInStock";
import { useTranslation } from "hooks/useTranslation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addItemToCart } from "store/thunks/cart";
import { Item } from "types";
import { Product, RelatedProduct } from "types/product";

import Button, { Size, Variant } from "components/Button/Button";
import { ToastStatus, showToast } from "components/Toast/Toast";

interface Props {
  product: Product | RelatedProduct;
  item?: Item;
  quantity?: number;
  customColor?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const AddToCart = ({
  product,
  item,
  quantity = 1,
  customColor = "",
  variant = "default",
  size = "smallFluid",
  className,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isInStock = useCheckStock(item ?? product?.items?.[0]);

  const hasMorethanOneItems = product?.items?.length && product?.items?.length > 1;
  const isDisabled =
    product.collectionName === "Merchandise" &&
      hasMorethanOneItems
      ? false : !isInStock;

  const addToCartClickHandler = () => {
    if (isInStock && item || !hasMorethanOneItems) {
      dispatch(
        addItemToCart({
          itemId: item?.item ?? product?.items?.[0].item,
          quantity,
        })
      );
      trackEvent(EVENTS.ADD_TO_CART);
    } else {
      showToast({ message: "Pick a size", status: ToastStatus.INFO });
      router.push(`/products/${product.uri}`);
    }
  };

  const { t } = useTranslation();

  return (
    <Button
      size={size}
      onClick={addToCartClickHandler}
      customColor={customColor}
      variant={variant}
      className={className}
      disabled={isDisabled}
    >
      {!isDisabled ? t("Put in backpack") : t("Out of stock")}
    </Button>
  );
};

export default AddToCart;
