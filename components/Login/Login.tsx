import { EVENTS, trackEvent } from "helpers/trackEvents";
import { useTranslation } from "hooks";
import { useUserAuthentication } from "hooks/useUserAuthentication";
import { useUserForm } from "hooks/useUserForm";
import { useRouter } from "next/router";

import Button from "components/Button/Button";
import Input from "components/Input";
import ResetPassword from "components/ResetPassword";
import { SignupButton } from "components/Shared/Buttons/SignupButton/SignupButton";

const Login = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { loginUser, isLoading } = useUserAuthentication();
  const { onUserFormChange, extractUserForm, userFormState } = useUserForm();

  const onLogin = () => {
    trackEvent(EVENTS.LOGIN);
    router.push("/profile");
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const userFormData = extractUserForm();
    loginUser(event, userFormData, onLogin);
  };

  return (
    <div className="flex min-h-full w-full flex-1 flex-col items-center">
      <div className="flex h-1/2 w-full flex-1 flex-col justify-center  space-y-8 px-4 md:w-[425px]">
        <h1>{t("Welcome back!")}</h1>
        <form onSubmit={onSubmit}>
          <Input
            error={userFormState.email.error}
            required
            name="email"
            label="Email"
            type="email"
            value={userFormState.email.value}
            onChange={onUserFormChange}
            placeholder="your@email.com"
          />

          <Input
            error={userFormState.password.error}
            required
            name="password"
            label="Password"
            type="password"
            value={userFormState.password.value}
            onChange={onUserFormChange}
            placeholder="********"
          />

          <Button
            loading={isLoading}
            size="bigFluid"
            type="submit"
            className="mt-4"
          >
            {t("Let’s go!")}
          </Button>
        </form>
        <ResetPassword />
      </div>
      <div className="mb-16 w-full px-4 md:w-[425px]">
        <SignupButton />
      </div>
    </div>
  );
};

export default Login;
