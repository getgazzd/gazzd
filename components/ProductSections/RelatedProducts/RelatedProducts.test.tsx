import { mockedInitialState } from "tests/mock/mockedStore";
import { render, screen } from "tests/test-utils";

import RelatedProducts from "./RelatedProducts";

const baseProps = {
  products: mockedInitialState.products.products,
};

describe("<RelatedProducts products={products} />: ", () => {
  test("renders successfully", () => {
    render(<RelatedProducts {...baseProps} />);
    expect(screen.getByText("Others also bought")).toBeInTheDocument();
  });
  test("renders nothing if no products", () => {
    render(<RelatedProducts products={[]} />);
    expect(screen.queryByText("Others also bought")).not.toBeInTheDocument();
  });
});
