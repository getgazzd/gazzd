import { useTranslation } from "hooks";
import { useState } from "react";
import { resetPasswordEmailAsync } from "store/transfers/userApi";

export const useResetPassword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState("");
  const { t } = useTranslation();

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const resetPassword = await resetPasswordEmailAsync(email);
      if (resetPassword) {
        setIsOpen(false);
        setComplete(true);
      }
    } catch (error: any) {
      setIsError(true);
      setErrorText(JSON.stringify(error.response.data.errors));
    }
  };
  return { complete, isOpen, setEmail, setIsOpen, email, onSubmit };
};
