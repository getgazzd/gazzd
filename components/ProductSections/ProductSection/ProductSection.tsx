import { Product } from "types/product";

import PriceOffProductLayout from "./PriceOffProductLayout";
import ProductDescription from "./ProductDescription/ProductDescription";
import MealShakeProductIcons from "./ProductIcons/MealShakeProductIcons";
import ProductIcons from "./ProductIcons/ProductIcons";
import ProductStamps from "./ProductIcons/ProductStamps";
import ProductImages from "./ProductImages/ProductImages";
import ProductNutritionList from "./ProductNutritionList/ProductNutritionList";

export interface ProductSectionProps {
  product: Product;
}

const ProductSection = ({ product }: ProductSectionProps) => {
  return (
    <div className="content-area -mt-8  md:-mt-16 lg:flex lg:flex-row lg:items-center lg:justify-center">
      <div className="lg:w-2/5">
        <PriceOffProductLayout product={product} />
        <ProductImages product={product} />
      </div>
      <div className="lg:w-1/4">
        <ProductDescription product={product} />
      </div>
      <div className="z-10 lg:order-first lg:w-1/4">
        {product && product.collectionName === "Meal-shake" ? (
          <MealShakeProductIcons product={product} />
        ) : (
          <ProductIcons product={product} />
        )}

        <ProductNutritionList product={product} />
        <ProductStamps product={product} />
      </div>
    </div>
  );
};

export default ProductSection;
