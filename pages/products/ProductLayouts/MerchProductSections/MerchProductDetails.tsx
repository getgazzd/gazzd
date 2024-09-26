import { Product } from "types";

import DynamicContent from "components/DynamicContent";
import Swoosh from "components/Icons/Swoosh";
import ProductNutritionList from "components/ProductSections/ProductSection/ProductNutritionList/ProductNutritionList";

interface Props {
  product: Product;
}

const MerchProductDetails = ({ product }: Props) => {
  return (
    <>
      <div className="-m-2 py-10 flex items-center justify-center">
        <Swoosh product={product} />
      </div>
      {/* Disabled for now */}
      {/* <ProductNutritionList product={product} /> */}

      <h5 className="w-full">details</h5>
      <p className="py-8">
        <DynamicContent content={product?.contentfulProduct!.merchDetails} />
      </p>
    </>
  );
};

export default MerchProductDetails;
