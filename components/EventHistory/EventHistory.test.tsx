import * as hook from "hooks/useEvents";
import { render, screen } from "tests/test-utils";

import EventHistory from "./EventHistory";

const events = [
  {
    event_type: "order",
    points: 100,
    action: "placed order",
    created_at: "date",
  },
];

const mockedUseEvents = jest.spyOn(hook, "useEvents");

describe("<EventHistory />:", () => {
  test("renders successfully", () => {
    mockedUseEvents.mockReturnValue({ events, loading: false });
    render(<EventHistory />);
    expect(screen.getByText("Your EXP gains")).toBeInTheDocument();
    expect(screen.getByText("order")).toBeInTheDocument();
    expect(screen.getByText("placed order")).toBeInTheDocument();
    expect(screen.getByText("100 XP")).toBeInTheDocument();
  });

  test("renders loader", () => {
    mockedUseEvents.mockReturnValue({ events, loading: true });
    render(<EventHistory />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
