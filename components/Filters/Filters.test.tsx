import * as reactRedux from "react-redux";
import { render, screen, fireEvent } from "tests/test-utils";
import Filters from "./Filters";

const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

describe("<Filters />", () => {
  it("renders", () => {
    render(<Filters />);
    expect(screen.getByTestId("filter")).toBeInTheDocument();
  });
});
