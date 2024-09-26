import { render, screen } from "tests/test-utils";

import ShippingMethods from "./ShippingMethods";

describe("<ShippingMethods />: ", () => {
  test("it renders successfully", () => {
    render(<ShippingMethods />);
    expect(screen.getByText("Shipping Methods")).toBeInTheDocument();
  });
});
