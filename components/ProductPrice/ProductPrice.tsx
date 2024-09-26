import { useQuery } from "@tanstack/react-query";
import useCurrentProduct from "hooks/useCurrentProduct";
import { getSteamer } from "store/transfers/react_query/steamer";
import { Product } from "types";

import PriceLoading from "components/PriceLoading";

interface Props {
  product: Product;
  className?: string;
  accent?: string | undefined;
}
const ProductPrice = ({ product, className, accent }: Props) => {
  const {
    currentProduct,
    currentParsedPrice,
    currentParsedPriceBeforeDiscount,
  } = useCurrentProduct(product);

  const { data } = useQuery(["steamer"], getSteamer);

  return (
    <div className={`flex flex-col ${className}`}>
      {currentProduct?.discountPercent !== 0 ? (
        <>
          <div className="flex md:flex-row md:items-end md:space-x-2 flex-col items-start justify-start space-x-0">
            {currentParsedPrice === "" ? (
              <h2>
                <PriceLoading />
              </h2>
            ) : (
              <>
                <h2
                  data-testid="productPrice"
                  style={{ color: data?.accentColor }}
                >
                  {currentParsedPrice}
                </h2>

                <span className="text-md line-through text-[#5A5A5A]">
                  {currentParsedPriceBeforeDiscount}
                </span>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex md:flex-row md:items-end md:space-x-2 flex-col items-start justify-start space-x-0">
            {currentParsedPrice === "" ? (
              <h2>
                <PriceLoading />
              </h2>
            ) : (
              <h2
                style={{
                  color:
                    product.collectionName === "Bundle"
                      ? accent
                        ? accent
                        : product.contentfulProduct?.accentColor
                      : "#fff",
                }}
              >
                {currentParsedPrice}
              </h2>
            )}
            <span
              style={
                product.collectionName === "Bundle"
                  ? { textDecoration: "line-through", color: "#5A5A5A" }
                  : {}
              }
              className="text-md"
            >
              {currentProduct.collectionName === "Bundle"
                ? currentProduct.bundleInfo?.priceOfItems
                : currentProduct.contentfulProduct?.extraInformation}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPrice;
