import { render, screen } from "tests/test-utils";

import SideBar, { Props } from "./SideBar";

const closeMock = jest.fn();

const baseProps: Props = {
  open: true,

  handleClose: closeMock,
  name: "test",
};

describe("<SideBar />: ", () => {
  test("should render SideBar successfully", () => {
    render(<SideBar {...baseProps} />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});
