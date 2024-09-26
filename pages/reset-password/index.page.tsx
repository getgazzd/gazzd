import Button from "components/Button/Button";
import Input from "components/Input";
import Layout from "components/Layouts/PageLayout";
import type { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "hooks";
import { useResetPasswordPage } from "./useResetPasswordPage";

const animation = {
  initial: { opacity: 0, y: 3 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 3, transition: { duration: 0.2 } },
};

const ResetPasswordPage: NextPage = () => {
  const {
    complete,
    onSubmit,
    email,
    verifiedEmail,
    setEmail,
    setVerifiedEmail,
  } = useResetPasswordPage();
  const { t } = useTranslation();

  return (
    <Layout
      title="Reset password"
      description="Reset your password"
      noPadding
      verticalCenter
    >
      <AnimatePresence exitBeforeEnter>
        {!complete ? (
          <div {...animation} className="md:w-full md:max-w-lg">
            <h2 className="mb-8">enter new password</h2>
            <form onSubmit={onSubmit}>
              <Input
                required
                name="password"
                label="new password"
                type="password"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                placeholder={t("Enter your new password")}
              />
              <Input
                required
                name="password2"
                label="repeat new password"
                type="password"
                value={verifiedEmail}
                onChange={(event) =>
                  setVerifiedEmail(event.currentTarget.value)
                }
                placeholder={t("Repeat new password")}
              />
              <Button
                size="smallFluid"
                variant="default"
                className="mt-4"
                type="submit"
              >
                {t("change password")}
              </Button>
            </form>
          </div>
        ) : (
          <motion.div {...animation} className="p-4 text-center">
            <h3>
              <span className="text-atomicApple">
                {t("Password change is a success!")}
              </span>
              <br />
              {t("let's get you to login")}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ResetPasswordPage;
