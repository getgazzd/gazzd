import { render, screen } from "tests/test-utils";

import Button, { Props } from "./Button";

const baseProps: Props = {};

describe("<Button />: ", () => {
  test("should render Button successfully", () => {
    render(<Button {...baseProps}>Content</Button>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
