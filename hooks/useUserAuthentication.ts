import { setLocalStorage } from "helpers/localStorage";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserIsAuthenticated,
  selectUserIsLoading,
} from "store/selectors/user";
import { logout } from "store/slices/userSlice";
import {
  _registerUser,
  _logoutUser,
  _updateUser,
  _loginUser,
  _getUser,
} from "store/thunks/user";
import { SignupForm } from "types/user";

/**
 * Hook for handling of authentication, registration and updating of a User
 */
export const useUserAuthentication = () => {
  const isLoading = useSelector(selectUserIsLoading);
  const isAuthenticated = useSelector(selectUserIsAuthenticated);

  const dispatch = useDispatch();

  /**
   * @param event SyntheticEvent
   * Registers a new User and authenticates if 200
   */
  const createUser = (
    event: SyntheticEvent,
    userFormData: SignupForm,
    callback?: () => void
  ): void => {
    event.preventDefault();
    const newCallback = () => {
      setLocalStorage("authenticated", "true");
      callback && callback();
    };
    dispatch(_registerUser({ ...userFormData, callback: newCallback }));
  };

  /**
   * Authenticats a User session
   * @param event SyntheticEvent
   * @param callback optional callback to execute if successful
   */
  const loginUser = (
    event: SyntheticEvent,
    userFormData: SignupForm,
    callback?: () => void
  ): void => {
    event.preventDefault();
    const newCallback = () => {
      setLocalStorage("authenticated", "true");
      callback && callback();
    };
    dispatch(_loginUser({ ...userFormData, callback: newCallback }));
  };

  /**
   * Destroys a User session
   */
  const logoutUser = (callback?: () => void) => {
    dispatch(_logoutUser(callback));
    dispatch(logout());
  };

  /**
   * Gets User information from Centra if authenticated
   */
  const getUser = (callback?: () => void) => {
    dispatch(_getUser({ callback }));
  };

  /**
   * Update User
   * @param formData form data for updating User
   */
  const updateUser = (event: SyntheticEvent, userFormData: SignupForm) => {
    event.preventDefault();
    const { email, password, ...rest } = userFormData;
    dispatch(_updateUser({ ...rest, newEmail: email }));
  };

  return {
    logoutUser,
    createUser,
    updateUser,
    loginUser,
    getUser,
    isAuthenticated,
    isLoading,
  };
};
