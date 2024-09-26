import { mockedInitialState } from "tests/mock/mockedStore";
import { render, screen } from "tests/test-utils";
import QuantityPicker, { Props } from "./QuantityPicker";

const incFunc = jest.fn();
const decFunc = jest.fn();

const baseProps: Props = {
  quantity: 1,
  increaseEvent: incFunc,
  decreaseEvent: decFunc,
};

describe("<QuantityPicker />: ", () => {
  test("should render QuantityPicker successfully", () => {
    render(<QuantityPicker {...baseProps} />);
    expect(screen.getByTestId("quantityPicker")).toBeInTheDocument();
  });
});
