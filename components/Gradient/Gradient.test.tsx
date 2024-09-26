import { render, screen } from "tests/test-utils";
import Gradient from "./Gradient";

describe("<Gradient />: ", () => {
  test("should render Gradient successfully", () => {
    render(<Gradient />);
    expect(screen.getByTestId("gradient")).toBeInTheDocument();
  });
});
