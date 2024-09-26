import { render, screen } from "tests/test-utils";
import Header from "./Header";

describe("<Header />: ", () => {
  test("should render Header successfully", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
