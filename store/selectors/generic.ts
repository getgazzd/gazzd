import { RootState } from "store";

export const selectAnyErrors = (state: RootState) => {
  return Object.entries(state).filter((slice) => slice[1].hasError);
};
