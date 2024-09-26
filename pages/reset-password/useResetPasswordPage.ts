import { useTranslation } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { passwordResetAsync } from "store/transfers/userApi";

import { ToastStatus, showToast } from "./../../components/Toast/Toast";

export const useResetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(false);
  const router = useRouter();
  const { id, i } = router.query;
  const { t } = useTranslation();

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (email === verifiedEmail) {
      const success = await passwordResetAsync({
        i: i as string,
        id: id as string,
        newPassword: email as string,
      });
      if (success) {
        setComplete(true);
        setTimeout(() => router.push("/login"), 2000);
      }
    } else {
      showToast({
        status: ToastStatus.WARNING,
        message: t("passwords dont match"),
      });
    }
  };
  return {
    complete,
    onSubmit,
    setEmail,
    email,
    setVerifiedEmail,
    verifiedEmail,
  };
};
