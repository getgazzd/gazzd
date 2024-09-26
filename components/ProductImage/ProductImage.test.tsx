import { render, screen } from "tests/test-utils";

import ProductImage, { Props } from "./ProductImage";

const baseProps: Props = {
  product: {
    product: "",
    name: "",
    slug: "",
    uri: "",
    sku: "",
    productSku: "",
    brand: "",
    brandName: "",
    brandUri: "",
    collection: "",
    collectionName: "",
    collectionUri: "",
    variantName: "",
    countryOrigin: "",
    excerpt: "",
    excerptHtml: "",
    description: "",
    descriptionHtml: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    stockUnit: "",
    category: "",
    centraProduct: "",
    centraVariant: "",
    itemQuantityMinimum: 1,
    itemQuantityMultipleOf: 1,
    items: [],
    price: "",
    priceAsNumber: 1,
    priceBeforeDiscount: "",
    priceBeforeDiscountAsNumber: 1,
    discountPercent: 1,
    showAsOnSale: true,
    showAsNew: true,
    available: true,
    //@ts-ignore
    media: { full: ["/img.jpg"], standard: ["/img.jpg"] },
    //@ts-ignore
    relatedProducts: [],
  },
};

describe("<ProductImage />: ", () => {
  test("should render ProductImage successfully", () => {
    render(<ProductImage {...baseProps} />);
    expect(screen.getByTestId("productImage")).toBeInTheDocument();
  });
});
