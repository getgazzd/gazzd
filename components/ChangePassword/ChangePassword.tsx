import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "hooks";

import Button from "components/Button/Button";
import Input from "components/Input";

import { useChangePassword } from "./useChangePassword";

const animation = {
  initial: { opacity: 0.7, y: -5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -3 },
  transition: { duration: 0.17 },
};

function ChangePassword() {
  const { t } = useTranslation();
  const { onChange, onSubmit, passwordState } = useChangePassword();

  return (
    <>
      <form onSubmit={onSubmit} className="w-full ">
        <Input
          name="currentPassword"
          required
          label={t("your password")}
          type="password"
          placeholder="enter your current password"
          onChange={onChange}
          value={passwordState.currentPassword}
          className="mb-4"
        />
        <Input
          name="newPassword"
          required
          label={t("new password")}
          type="password"
          placeholder="new password"
          onChange={onChange}
          value={passwordState.newPassword}
        />
        <Input
          name="confirmPassword"
          required
          label={t("confirm new password")}
          type="password"
          placeholder="confirm new password"
          onChange={onChange}
          value={passwordState.confirmPassword}
        />
        <Button size="smallFluid" type="submit" className="mt-4">
          {t("change my password")}
        </Button>
      </form>
    </>
  );
}

export default ChangePassword;
