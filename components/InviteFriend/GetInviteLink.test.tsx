import { render, screen } from "tests/test-utils";

import GetInviteLink from "./GetInviteLink";

describe("<GetInviteLink />: ", () => {
  beforeEach(() => {
    let clipboardData = ""; //initalizing clipboard data so it can be used in testing
    const mockClipboard = {
      writeText: jest.fn((data) => {
        clipboardData = data;
      }),
      readText: jest.fn(() => {
        return clipboardData;
      }),
    };
    //@ts-ignore
    global.navigator.clipboard = mockClipboard;
  });

  test("should copy correct link for staging", async () => {
    process.env.NEXT_PUBLIC_STAGE = "staging";
    render(<GetInviteLink />);
    screen.getByText("copy invitation link").click();
    expect(navigator.clipboard.readText()).toBe(
      "https://staging.gazzd.com/signup?invite_token=undefined"
    );
  });
  test("should copy correct link for production", () => {
    process.env.NEXT_PUBLIC_STAGE = "production";
    render(<GetInviteLink />);
    screen.getByText("copy invitation link").click();
    expect(navigator.clipboard.readText()).toBe(
      "https://gazzd.com/signup?invite_token=undefined"
    );
  });
});
