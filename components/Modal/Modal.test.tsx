import { fireEvent, render, screen } from "@testing-library/react";
import Modal, { Props } from "./Modal";

const closeMock = jest.fn();

const baseProps: Props = {
  open: true,
  handleClose: closeMock,
};

describe("<Modal />: ", () => {
  test("should render successfully when open", () => {
    render(<Modal {...baseProps}>Content</Modal>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("modal-backdrop")).toBeInTheDocument();
  });

  test("should hide content when closed", () => {
    const props = { ...baseProps, open: false };
    render(<Modal {...props}>Content</Modal>);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  test("should call handleClose when backdrop clicked", () => {
    render(<Modal {...baseProps}>Content</Modal>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(closeMock).toHaveBeenCalled();
  });
});
