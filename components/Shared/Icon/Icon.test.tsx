import { render, screen } from "tests/test-utils";
import Icon, { Props } from "./Icon";

const baseProps: Props = {
  type: "battery",
};

describe("<Icon />: ", () => {
  test("should render Icon successfully", () => {
    render(<Icon {...baseProps} />);
    expect(screen.getByAltText("GAZZD icon")).toBeInTheDocument();
  });
});
