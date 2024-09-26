import { InputType } from "components/Input/Input";

type ValidationResponse = {
  validationError: boolean;
  helperText: string;
};

export const validateInput = (
  value: string,
  type: InputType,
  label: string,
  maxLength: number = 60
): ValidationResponse => {
  if (value && value.length && value?.length >= maxLength) {
    return { validationError: true, helperText: "too long" };
  }
  if (value && value.length && value?.length > 1) {
    switch (type) {
      case "email":
        if (
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return {
            validationError: false,
            helperText: "",
          };
        } else {
          return {
            validationError: true,
            helperText: "Please enter a valid " + label,
          };
        }

      case "text":
        if (/^[A-ZÄÖÅa-zäöå0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(value))
          return { validationError: false, helperText: "" };
        return {
          validationError: true,
          helperText: "Please enter a valid " + label,
        };

      case "password":
        return { validationError: false, helperText: "" };

      default:
        console.log("not impl");
        return { validationError: false, helperText: "" };
    }
  }
  return { validationError: false, helperText: "" };
};
