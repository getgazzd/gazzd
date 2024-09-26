import { Product } from "types/product";

interface Props {
  product: Product;
}

function ProductNutritionList({ product }: Props) {
  return (
    <ul className="list-inside list-disc">
      {product?.contentfulProduct?.tableOfContent?.map((contentItem: any) => {
        return (
          <li key={contentItem.fields.contentDescription}>
            {contentItem.fields.contentDescription}
          </li>
        );
      })}
    </ul>
  );
}

export default ProductNutritionList;
