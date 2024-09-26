import { render } from "tests/test-utils";
import Index from "../index.page";

describe("pages/index", () => {
  test("renders successfully", () => {
    render(<Index />);
  });
});
