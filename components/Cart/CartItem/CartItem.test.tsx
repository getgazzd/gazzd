import { render, screen } from "tests/test-utils";

import CartItem, { Props } from "./CartItem";

const baseProps: Props = {
  item: {
    line: "1111",
    quantity: 1,
    product: {
      product: "",
      relatedProducts: [],
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
    item: "item",
    totalPrice: "",
  },
};

describe("<CartItem />: ", () => {
  test("should render CartItem successfully", () => {
    render(<CartItem {...baseProps}>Content</CartItem>);
    expect(screen.getByTestId("cartItem")).toBeInTheDocument();
  });
});
