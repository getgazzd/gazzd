import { useRouter } from "next/router";
import { render, screen } from "tests/test-utils";

import ProductCard, { Props } from "./ProductCard";

const baseProps: Props = {
  product: {
    product: "",
    // @ts-ignore
    relatedProducts: {},
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
    // @ts-ignore
    media: { full: ["/img.jpg"], standard: ["/img.jpg"] },
  },
};

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
describe("<ProductCard />: ", () => {
  test("should render ProductCard successfully", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByTestId("productCard")).toBeInTheDocument();
  });
});
