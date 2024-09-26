import { FormEvent, useState } from "react";

import { validateInput } from "helpers/input";

export type InputType = "text" | "email" | "password" | "search" | "checkbox";

interface InputProps {
  name?: string;
  value?: any; // TODO: fix value type
  label?: string;
  type?: InputType;
  className?: string;
  required?: boolean;
  icon?: JSX.Element;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  noMargin?: boolean;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}
type StatusType = {
  validationError: boolean;
  helperText: string;
};

const Input = ({
  icon,
  name,
  value,
  label,
  error,
  onChange,
  className,
  noMargin = false,
  placeholder,
  disabled,
  type = "text",
  required = false,
  autoFocus,
}: InputProps) => {
  const [inputStatus, setInputStatus] = useState<StatusType>({
    validationError: false,
    helperText: "",
  });

  const statusColor =
    inputStatus.validationError || error ? "#FF3333" : "#FFFFFF";

  const onBlur = () => {
    setInputStatus(validateInput(value as string, type, label as string));
  };

  return (
    <>
      <div
        style={{ border: "1px solid " + statusColor }}
        className={`${
          noMargin ? "" : "mt-4"
        } flex w-full flex-col p-2 transition-colors duration-200`}
      >
        {label && (
          <label>
            <h5
              style={{ color: statusColor }}
              className="font-semibold tracking-wide"
            >
              {label}
            </h5>
          </label>
        )}
        <input
          disabled={disabled}
          className={`outline-none box-border w-full bg-transparent pt-1 font-bold tracking-wide`}
          id={name}
          name={name}
          type={type}
          value={value}
          aria-label={name}
          required={required}
          placeholder={placeholder}
          onChange={onChange && onChange}
          onBlur={onBlur}
          autoFocus={autoFocus}
        />
        {icon && <div className="absolute right-0 top-0 mt-5 mr-4">{icon}</div>}
      </div>
      {inputStatus.helperText ||
        (error && (
          <p
            style={{ color: statusColor }}
            className="mt-1 mb-2 text-sm font-semibold"
            id="helperText"
          >
            {inputStatus.helperText || error}
          </p>
        ))}
    </>
  );
};

export default Input;
