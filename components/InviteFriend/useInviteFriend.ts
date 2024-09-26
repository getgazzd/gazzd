import { useState } from "react";
import { toast } from "react-toastify";

import { ToastStatus, showToast } from "components/Toast/Toast";

import { useTranslation } from "./../../hooks/useTranslation";
import { sendInviteToEmail } from "./../../store/transfers/userApi";

const useInviteFriend = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const success = await sendInviteToEmail({ email });
    if (success) {
      showToast({
        message: t("Invite sent!"),
        status: ToastStatus.SUCCESS,
      });
      setOpen(false);
      setEmail("");
    } else {
      showToast({
        message: t("Invitaion failed"),
        status: ToastStatus.WARNING,
      });
    }
    setLoading(false);
  };

  return {
    t,
    onSubmit,
    open,
    setOpen,
    email,
    setEmail,
    loading,
  };
};
export default useInviteFriend;
