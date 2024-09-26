import { EVENTS, trackEvent } from "helpers/trackEvents";
import { useTranslation } from "hooks/useTranslation";
import { useUserAuthentication } from "hooks/useUserAuthentication";
import { useUserForm } from "hooks/useUserForm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "store/selectors/selection";
import {
  createUserForTokenAsync,
  emailSubscribeAsync,
} from "store/transfers/userApi";

import Button from "components/Button/Button";
import Input from "components/Input";
import { fbPixelLead } from "components/MetaPixel/MetaPixel";

const Signup = () => {
  const { createUser, isAuthenticated } = useUserAuthentication();
  const { userFormState, onUserFormChange, extractUserForm } = useUserForm();
  const { t } = useTranslation();
  const { push } = useRouter();
  const { query } = useRouter();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (isAuthenticated) {
      push("/profile");
    }
  }, [isAuthenticated]);

  const onSubmit = (event: React.SyntheticEvent) => {
    const callback = async () => {
      const invite_token = query["invite_token"] as string;
      await createUserForTokenAsync({
        api_token: token,
        invite_token,
      });
      await emailSubscribeAsync(userFormData.email);
      fbPixelLead();
      trackEvent(EVENTS.SIGN_UP);
      push("/profile");
    };
    const userFormData = extractUserForm();
    createUser(event, userFormData, callback);
  };

  return (
    <div className="flex min-h-full w-full flex-1 flex-col items-center">
      <div className="md:w-[425px]] flex h-1/2 w-full flex-1 flex-col  justify-center space-y-8 px-4">
        <h1>{t("Join the party!")}</h1>
        <form onSubmit={onSubmit}>
          <div>
            <Input
              error={userFormState?.firstName?.error}
              required
              name="firstName"
              label="First name"
              type="text"
              value={userFormState.firstName.value}
              onChange={onUserFormChange}
              placeholder="Enter your firstname"
            />
            <Input
              error={userFormState?.lastName?.error}
              required
              name="lastName"
              label="Last name"
              type="text"
              value={userFormState.lastName.value}
              onChange={onUserFormChange}
              placeholder="Enter your lastname"
            />
          </div>
          <div>
            <div>
              <Input
                error={userFormState?.email?.error}
                required
                name="email"
                label="Email"
                type="email"
                value={userFormState.email.value}
                onChange={onUserFormChange}
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <div>
              <Input
                error={userFormState?.password?.error}
                required
                name="password"
                label="Password"
                type="password"
                value={userFormState.password.value}
                onChange={onUserFormChange}
                placeholder="********"
              />
            </div>
          </div>
          <Button className="mt-4" size="bigFluid" type="submit">
            {t("It’s time!")}
          </Button>
        </form>
      </div>
      <div className="mb-16 w-full px-4 md:w-[425px]">
        <div className="self-end">
          <Link href="/login" passHref>
            <Button size="smallFluid" className="mt-4" variant="ghost">
              {t("I’m already in the gang!")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
