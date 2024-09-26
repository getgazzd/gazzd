import Image from "next/image";
import { Product, RelatedProduct } from "types/product";

export interface Props {
  product: Product | RelatedProduct;
  height?: number;
  width?: number;
  className?: string;
  source?: string;
}

function ProductImage({ product, height, width, source, className }: Props) {
  const getImageSrc = () => {
    if (source) return source;
    // @ts-ignore
    if (product?.media?.["1200x1200"]?.[0]) {
      // @ts-ignore
      return product?.media["1200x1200"]?.[0];
    }
    return "/images/fallback-image.jpg";
  };
  const url = getImageSrc();

  return (
    <div className={`select-none ${className}`} data-testid="productImage">
      <Image
        src={url}
        alt={product?.name}
        width={1200 ?? width}
        height={1200 ?? height}
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
  );
}

export default ProductImage;
