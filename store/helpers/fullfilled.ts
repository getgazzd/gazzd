import { WritableDraft } from "immer/dist/internal";
import { UserState } from "store/slices/userSlice";

export const resetUserState = (state: WritableDraft<UserState>) => {
  const newState = { ...state };
  newState.loading = false;
  newState.hasError = false;
  newState.error = {
    centra: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
    },
    backend: {},
    uncaught: undefined,
  };
  return newState;
};
