import { render, screen } from "tests/test-utils";

import ProfileXP from "./ProfileXP";

jest.mock("store/transfers/userApi", () => ({
  getBackendUserAsync: jest.fn(() => ({ xp: 500, level: 1 })),
}));

describe("<ProfileXP />: ", () => {
  test("renders successfully", async () => {
    render(<ProfileXP />);
    expect(await screen.findByText("500")).toBeInTheDocument();
  });
});
