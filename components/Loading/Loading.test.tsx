import { render, screen } from "tests/test-utils";
import Loading from "./Loading";

describe("<Loading />: ", () => {
  test("should render Loading successfully", () => {
    render(<Loading />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
