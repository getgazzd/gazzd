import { useTranslation } from "hooks";
import { useState } from "react";
import { changePasswordAsync } from "store/transfers/userApi";
import { InputEvent } from "types/event";

import { ToastStatus, showToast } from "./../Toast/Toast";

export const useChangePassword = () => {
  const [passwordState, setPasswordState] = useState<{
    newPassword: string;
    currentPassword: string;
    confirmPassword: string;
  }>({
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (passwordState.newPassword === passwordState.confirmPassword) {
      const success = await changePasswordAsync({
        password: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
      });
      if (success) {
        showToast({
          message: t("password changed!"),
          status: ToastStatus.SUCCESS,
        });
        setPasswordState({
          newPassword: "",
          currentPassword: "",
          confirmPassword: "",
        });
      }
    } else {
      showToast({
        message: t("passwords dont match"),
        status: ToastStatus.WARNING,
      });
    }
  };

  const onChange = (e: InputEvent) => {
    e.preventDefault();
    setPasswordState({
      ...passwordState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return { onChange, onSubmit, passwordState };
};
