import Icon from "components/Shared/Icon";
import { selectBackendUser } from "store/selectors/user";
import { useBackendUser } from "pages/profile/dashboard/useBackendUser";
import { useSelector } from "react-redux";
import { useTranslation } from "hooks";

const TwitchAccount = () => {
  const user = useSelector(selectBackendUser);
  const { t } = useTranslation();

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

    window.open(
      `https://id.twitch.tv/oauth2/authorize?${query}`,
      "targetWindow",
      `toolbar=no,
     location=no,
     status=no,
     menubar=no,
     scrollbars=yes,
     resizable=yes,
     width=650,
     height=850`
    );
  };

  return (
    <>
      {Boolean(!user?.twitch_name) ? (
        <div
          role="button"
          onClick={handleTwitchOauth}
          className="py-8 border border-brand-twitch flex items-center justify-center relative overflow-hidden flex-col select-none"
        >
          <div className="absolute -rotate-12 left-8 opacity-10 ">
            <Icon type="twitch" width={250} height={250} />
          </div>
          <h3 className="text-brand-twitch">{t("Link twitch account")}</h3>
        </div>
      ) : (
        <div className="bg-gradient-to-r py-2 md:py-8 from-brand-twitch/50 via-brand-twitch to-brand-twitch/70 animate-text flex items-center justify-center relative overflow-hidden flex-col select-none ">
          <div
            role="button"
            onClick={handleTwitchOauth}
            className="absolute bottom-2 right-2 px-1 py-0.5 ease-in-out hover:rotate-90 cursor-pointer transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
          <h5 className="pb-4">Twitch Account Linked</h5>
          <div className="absolute -rotate-12 left-8 opacity-20 ">
            <Icon type="twitch" width={250} height={250} />
          </div>
          <h2>{user?.twitch_name}</h2>
        </div>
      )}
    </>
  );
};

export default TwitchAccount;
