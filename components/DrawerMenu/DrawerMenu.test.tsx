import { render, screen } from "tests/test-utils";
import DrawerMenu from "./DrawerMenu";

describe("<DrawerMenu />: ", () => {
  test("should render DrawerMenu successfully", () => {
    render(<DrawerMenu />);
    expect(screen.getByTestId("drawerMenu")).toBeInTheDocument();
  });
});
