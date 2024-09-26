import { render, fireEvent, screen } from "tests/test-utils";
import SearchField from "./SearchField";

const fn = jest.fn();

describe("<SearchField />", () => {
  it("renders", () => {
    render(<SearchField placeholder="Search" onChange={fn} />);
  });

  it("changes input", () => {
    render(<SearchField placeholder="Search" onChange={fn} />);
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "new input" },
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
