import { render, screen } from "tests/test-utils";
import Footer from "./Footer";

describe("<Footer />: ", () => {
  test("should render Footer successfully", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
