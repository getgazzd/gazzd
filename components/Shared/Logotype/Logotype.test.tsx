import { render, screen } from "tests/test-utils";
import Logotype, { Props } from "./Logotype";

const baseProps: Props = {
  variant: "white",
};

describe("<Logotype />: ", () => {
  test("should render Logotype successfully", () => {
    render(<Logotype {...baseProps} />);
    expect(screen.getByAltText("GAZZD logotype")).toBeInTheDocument();
  });
});
