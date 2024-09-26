import { render, screen } from "tests/test-utils";
import DrawerCart from "./DrawerCart";

describe("<DrawerCart />: ", () => {
  test("should render DrawerCart successfully", () => {
    render(<DrawerCart />);
    expect(screen.getByTestId("rucksack")).toBeInTheDocument();
  });
});
