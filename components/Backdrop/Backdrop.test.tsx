import { render, screen } from "tests/test-utils";
import Backdrop, { Props } from "./Backdrop";

const closeMock = jest.fn();

const baseProps: Props = {
  handleClose: closeMock,
};

describe("<Backdrop />: ", () => {
  test("should render successfully when modal open", () => {
    render(<Backdrop {...baseProps}>Content</Backdrop>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
