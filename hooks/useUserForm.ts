import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCentraErrors, selectUser } from "store/selectors/user";
import { clearErrors } from "store/slices/userSlice";
import { InputEvent, InputSelect } from "types/event";
import { PaymentForm, SignupForm, SignupFormState } from "types/user";

type Key = keyof SignupFormState;

/**
 * Hook for handling User forms uniformly
 */
export const useUserForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const errors = useSelector(selectCentraErrors);

  // clear the state of errors if any
  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  // listen for errors and set them for each
  useEffect(() => {
    setUserFormState((state) => ({
      ...state,
      firstName: {
        value: state.firstName.value,
        error: errors?.firstName,
      },
      lastName: {
        value: state.lastName.value,
        error: errors?.lastName,
      },
      email: {
        value: state.email.value,
        error: errors?.email,
      },
      password: {
        value: state.password.value,
        error: errors?.password,
      },
    }));
  }, [errors]);

  // State used for filling in User forms across the site
  const [userFormState, setUserFormState] = useState<SignupFormState>({
    firstName: {
      value: "",
    },
    lastName: {
      value: "",
    },
    password: {
      value: "",
    },
    email: {
      value: "",
    },
    address1: {
      value: "",
    },
    city: {
      value: "",
    },
    zipCode: {
      value: "",
    },
  });

  const [userPaymentFormState, setUserPaymentFormState] = useState<PaymentForm>(
    {
      paymentMethod: "klarna",
      paymentReturnPage: `/checkout/success`,
      paymentFailedPage: `/checkout/failed`,
      termsAndConditions: true,
      address: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        zipCode: "",
        newsletter: true,
        city: "",
        state: "",
        country: "",
        phoneNumber: "",
      },
    }
  );

  /**
   * Unifrom handler for User forms
   * @param event
   */
  const onUserFormChange = (event: InputEvent) => {
    event.preventDefault();
    setUserFormState({
      ...userFormState,
      [event.currentTarget.name]: { value: event.currentTarget.value },
    });
  };

  const onUserPaymentFormChange = (
    event: InputEvent | ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setUserPaymentFormState({
      ...userPaymentFormState,
      address: {
        ...userPaymentFormState.address,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
  };

  const onUserPaymentMultiSelectChange = (event: InputSelect) => {
    setUserPaymentFormState({
      ...userPaymentFormState,
      address: {
        ...userPaymentFormState.address,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
  };

  /**
   * Fills the user form with User state
   */
  const preFillUserForm = () => {
    setUserFormState({
      ...userFormState,
      firstName: {
        value: user.firstName,
      },
      lastName: {
        value: user.lastName,
      },
      password: {
        value: user.password,
      },
      email: {
        value: user.email,
      },
      city: {
        value: user.city,
      },
      address1: {
        value: user.address1,
      },
      zipCode: {
        value: user.zipCode,
      },
      phoneNumber: {
        value: user.phoneNumber,
      },
    });
  };

  const preFillPaymentForm = () => {
    setUserPaymentFormState({
      ...userPaymentFormState,
      address: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        address1: user.address1,
        zipCode: user.zipCode,
        newsletter: true,
        city: user.city,
        country: user.country,
        phoneNumber: user.phoneNumber,
      },
    });
  };

  /**
   * @returns SignUpForm as Centra expect the data to be
   */
  const extractUserForm = (): SignupForm =>
    Object.keys(userFormState).reduce(
      (signupForm, key) => ({
        ...signupForm,
        [key]: userFormState[key as Key]?.value,
      }),
      {} as SignupForm
    );

  return {
    onUserPaymentMultiSelectChange,
    onUserPaymentFormChange,
    preFillPaymentForm,
    extractUserForm,
    onUserFormChange,
    preFillUserForm,
    userPaymentFormState,
    userFormState,
  };
};
