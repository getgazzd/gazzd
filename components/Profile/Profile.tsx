import Button from "components/Button/Button";
import ChangePassword from "components/ChangePassword";
import ProfileSettings from "components/ProfileSettings";
import { selectBackendUser } from "store/selectors/user";
import { useSelector } from "react-redux";
import { useTranslation } from "hooks/useTranslation";
import { useUserAuthentication } from "hooks/useUserAuthentication";

const Profile = () => {
  const { logoutUser } = useUserAuthentication();
  const { t } = useTranslation();
  const backendUser = useSelector(selectBackendUser);

  const handleLogout = () => {
    logoutUser();
  };

  const handleTwitchOauth = () => {
    const redirect_uri = `${window.location.protocol}//${window.location.host}/oauth/twitch`;
    const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ?? "";
    const params: Record<string, string> = {
      redirect_uri,
      client_id,
      response_type: "code",
      scope: "user%3Aread%3Aemail",
    };

    const query = Object.keys(params)
      .map((key: string) => `${key}=${params[key]}`)
      .join("&");

    window.location.href = `https://id.twitch.tv/oauth2/authorize?${query}`;
  };

  return (
    <div className="flex flex-col items-center">
      <ProfileSettings />
      <div className="w-full border-t border-borderGray py-8 md:px-8">
        <ChangePassword />
        <Button onClick={handleLogout} variant="ghost" size="smallFluid">
          {t("log out")}
        </Button>
        <Button
          onClick={handleTwitchOauth}
          variant="ghost"
          size="smallFluid"
          disabled={Boolean(backendUser?.twitch_name)}
        >
          {t(
            backendUser?.twitch_name
              ? `Linked: ${backendUser.twitch_name}`
              : "Link Twitch account"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
