import { fireEvent, render, screen } from "tests/test-utils";

import Orders from "./Orders";

describe("<Orders />: ", () => {
  test("renders successfully", async () => {
    // @ts-ignore
    render(<Orders />);
    expect(screen.getByText(`W00t!?`)).toBeInTheDocument();
  });
});
