import Input from "./Input";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Tests <Input /> component", () => {
  it("displays a label", () => {
    render(<Input label="This is a label" />);
    expect(screen.getByText("This is a label")).toBeInTheDocument();
  });

  it("displays a placeholder", () => {
    render(<Input placeholder="This is a placeholder" />);
    expect(
      screen.getByPlaceholderText("This is a placeholder")
    ).toBeInTheDocument();
  });

  it("value is present and onChange", () => {
    const onChange = jest.fn();

    render(<Input onChange={onChange} value="This is a value" />);
    expect(screen.getByDisplayValue("This is a value")).toBeInTheDocument();
  });

  it("when value is changed, onChange is called", () => {
    const onChange = jest.fn();

    const utils = render(
      <Input name="input-aria-label" onChange={onChange} value="" />
    );
    const input = utils.getByLabelText("input-aria-label");

    fireEvent.change(input, {
      target: { value: "new input" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
