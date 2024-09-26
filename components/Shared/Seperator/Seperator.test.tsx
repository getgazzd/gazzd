import { render, screen } from "tests/test-utils";
import Seperator from "./Seperator";

describe("<Seperator />: ", () => {
  test("should render Seperator successfully", () => {
    render(<Seperator />);
    expect(screen.getByTestId("seperator")).toBeInTheDocument();
  });
});
