import { render, screen } from "tests/test-utils";

import BackgroundImage, { Props } from "./BackgroundImage";

const baseProps: Props = {
  page: "landing",
};

describe("<BackgroundImage />", () => {
  test("renders successfully", () => {
    render(<BackgroundImage {...baseProps}></BackgroundImage>);
    expect(screen.getByTestId("background")).toBeInTheDocument();
  });
});
