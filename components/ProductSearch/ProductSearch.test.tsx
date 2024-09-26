import { render, fireEvent, screen } from "tests/test-utils";
import ProductSearch from "./ProductSearch";
import * as reactRedux from "react-redux";

const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

describe("<ProducSearch />", () => {
  beforeEach(() => {
    useDispatchMock.mockClear();
  });

  it("renders", () => {
    render(<ProductSearch />);
  });

  it("changes input", () => {
    const mockFunc = jest.fn();
    useDispatchMock.mockReturnValue(mockFunc);

    render(<ProductSearch />);
    fireEvent.change(screen.getByPlaceholderText("Search products"), {
      target: { value: "new input" },
    });
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });
});
