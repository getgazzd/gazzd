import { render, screen, fireEvent } from "tests/test-utils";
import FilterButton from "./FilterButton";

const onSelect = jest.fn();

describe("<FilterButton />", () => {
  it("renders", () => {
    render(<FilterButton title="Title" selected={false} onSelect={onSelect} />);
  });

  it("displays title", () => {
    render(<FilterButton title="Title" selected={false} onSelect={onSelect} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
