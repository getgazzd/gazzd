import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAnyErrors } from "store/selectors/generic";

export const useErrorNotification = () => {
  const anyErrors = useSelector(selectAnyErrors);

  useEffect(() => {
    if (anyErrors) {
      console.error("An error occured", anyErrors);
    }
  }, [anyErrors]);
};
