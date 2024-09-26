import Signup from "./Signup";
import * as userHook from "hooks/useUserForm";
import { render, fireEvent } from "tests/test-utils";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn })),
}));

const loading = false;
const onUserFormChange = jest.fn();

describe("Tests for <Signup /> component", () => {
  it("should set signup state correctly", () => {
    const utils = render(<Signup />);

    const firstNameInput = utils.getByLabelText("firstName");
    const lastNameInput = utils.getByLabelText("lastName");
    const emailInput = utils.getByLabelText("email");
    const passwordInput = utils.getByLabelText("password");

    fireEvent.change(firstNameInput, {
      target: { value: "Basse" },
    });
    fireEvent.change(lastNameInput, {
      target: { value: "Lundqvist" },
    });
    fireEvent.change(emailInput, {
      target: { value: "basse@lundqvist.se" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "pass" },
    });
  });
});
