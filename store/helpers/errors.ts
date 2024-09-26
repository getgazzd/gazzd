import { WritableDraft } from "immer/dist/internal";
import { UserState } from "store/slices/userSlice";
import { CentraError } from "types";
import { CentraNetworkError } from "types/network";

interface Payload {
  payload: CentraNetworkError | undefined;
}

// This array is used for our form fields for searching for errors
export const formErrorArray = ["firstName", "lastName", "password", "email"];

const extractCentraErrors = (
  error: CentraNetworkError | undefined
): CentraError => {
  const centraErrors = error?.response?.data?.errors;
  if (centraErrors) {
    return Object.keys(centraErrors).reduce(
      (prev: CentraError, key: string) => {
        const error = centraErrors[key];
        if (formErrorArray.includes(key)) {
          return { ...prev, [key]: error };
        } else if (key === "newEmail") {
          return { ...prev, ["email"]: error };
        } else {
          console.error(`uncaught error: key ${key} is not in array`);
          return prev;
        }
      },
      {} as CentraError
    );
  } else {
    return {};
  }
};

export const handleCentraReject = (
  state: WritableDraft<UserState>,
  { payload }: Payload
) => {
  state.loading = false;
  state.hasError = true;
  state.error.centra = extractCentraErrors(payload);
};
