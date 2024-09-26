import Button from "components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "hooks";
import Input from "components/Input";
import { useResetPassword } from "./useResetPassword";

const animation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

function ResetPassword() {
  const { t } = useTranslation();
  const { complete, isOpen, setIsOpen, setEmail, email, onSubmit } =
    useResetPassword();

  return (
    <div className="space-y-4">
      {!complete ? (
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <h4 className="hover:underline">{t("Lost you password?")}</h4>
        </div>
      ) : (
        <h4>{t("Thank you, Please check you email!")}</h4>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div className=" space-y-5" {...animation}>
            <form onSubmit={onSubmit}>
              <Input
                name="email"
                placeholder={t("your email")}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />

              <Button size="smallFluid" type="submit" className="mt-4">
                {t("reset my password")}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ResetPassword;
