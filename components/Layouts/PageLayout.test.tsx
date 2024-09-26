import { render, screen } from "tests/test-utils";
import PageLayout, { Props } from "./PageLayout";

const baseProps: Props = {
  title: "page",
  description: "test page",
};

describe("<PageLayout />: ", () => {
  test("should render PageLayout successfully", () => {
    render(<PageLayout {...baseProps} />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});
