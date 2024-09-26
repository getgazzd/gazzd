import { useQuery } from "@tanstack/react-query";
import { getBundle } from "store/transfers/react_query/bundle";
import { Item, Product } from "types";

import DynamicContent from "components/DynamicContent";
import ProductPrice from "components/ProductPrice/ProductPrice";

interface Props {
  product: Product;
}

const BundleProductDescription = ({ product }: Props) => {
  return (
    <div className="text-left flex flex-col space-y-8 mb-8">
      <h1>{product?.contentfulProduct?.title}</h1>
      <BundleProductList product={product} />
      <DynamicContent
        content={product?.contentfulProduct!.productDescription}
      />
      <ProductPrice product={product} className="my-8" />
    </div>
  );
};

export default BundleProductDescription;

export const BundleProductList = ({ product }: { product: Product }) => {
  const { data } = useQuery(["bundle"], () => getBundle(product));
  if (!data) return null;

  return (
    <div>
      {/* @ts-ignore */}
      {data.sectionProducts?.map((item: Item, index: number) => {
        // @ts-ignore
        const match = data?.bundle?.bundleInfo?.sections?.find(
          (el: any) => el.products[0].toString() === item.product
        );

        return (
          <h4 key={item.item}>
            {match.quantity} X {item.name}
          </h4>
        );
      })}
    </div>
  );
};
