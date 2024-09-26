import { mockedInitialState } from "tests/mock/mockedStore";
import { render, screen } from "tests/test-utils";
import ProductsGrid, { Props } from "./ProductsGrid";

const baseProps: Props = {
  products: mockedInitialState.products.products,
};

describe("<ProductsGrid />: ", () => {
  test("should render ProductsGrid successfully", () => {
    render(<ProductsGrid {...baseProps} />);
    expect(screen.getByTestId("productsGrid")).toBeInTheDocument();
  });
});
