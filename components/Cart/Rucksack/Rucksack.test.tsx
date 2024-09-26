import { render, screen } from "tests/test-utils";
import Rucksack from "./Rucksack";

describe("<Rucksack />: ", () => {
  test("should render Rucksack successfully", () => {
    render(<Rucksack />);
    expect(screen.getByTestId("rucksack")).toBeInTheDocument();
  });
});
