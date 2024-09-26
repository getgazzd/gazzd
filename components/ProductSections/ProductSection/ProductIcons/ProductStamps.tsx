import { Product } from "types";

import Icon from "components/Shared/Icon";

interface Props {
  product: Product;
}
const ProductStamps = ({ product }: Props) => {
  return (
    <div className="w-full h-full flex space-x-2 py-8">
      <span>
        <Icon type="gmp" width={40} height={40} />
      </span>
      <span>
        <Icon type="gluten" width={40} height={40} />
      </span>
      <span>
        <Icon type="sugar" width={40} height={40} />
      </span>
      {product?.collectionName !== "Meal-shake" && (
        <span>
          <Icon type="leaf" width={40} height={40} />
        </span>
      )}
      {product.collectionName === "Gamer supp" && (
        <span>
          <Icon type="haccp" width={40} height={40} />
        </span>
      )}
    </div>
  );
};

export default ProductStamps;
