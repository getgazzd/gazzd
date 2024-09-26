import { Product } from "types";

import ProductImage from "components/ProductImage";
import SocialMediaBar from "components/Socials/SocialMediaBar";

import MerchProductDetails from "./MerchProductDetails";

interface Props {
  product: Product;
}

const MerchProductSubSection = ({ product }: Props) => {
  return (
    <div className="flex flex-col md:flex-row h-full w-full justify-center self-baseline container mx-auto ">
      <div className="h-auto w-full md:w-3/5 py-6 md:py-0">
        {/* @ts-ignore */}
        {product?.media["1200x1200"][1] && (
          // @ts-ignore
          <ProductImage
            product={product}
            source={product?.media["1200x1200"][1]}
          />
        )}
      </div>
      <div className="flex w-full md:w-2/5 max-w-[425px] flex-col items-center justify-start md:pl-16">
        <MerchProductDetails product={product} />
        <SocialMediaBar />
      </div>
    </div>
  );
};

export default MerchProductSubSection;
