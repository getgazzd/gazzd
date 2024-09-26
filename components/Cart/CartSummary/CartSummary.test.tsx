import { render, screen } from "tests/test-utils";
import CartSummary from "./CartSummary";

describe("<CartSummary />: ", () => {
  test("should render CartSummary successfully", () => {
    render(<CartSummary />);
    expect(screen.getByTestId("listCartItem")).toBeInTheDocument();
  });
});
