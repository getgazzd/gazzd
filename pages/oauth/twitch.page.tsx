import { useTranslation } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { API, BACKEND_ADDRESS } from "store/transfers/config";

import Layout from "components/Layouts/PageLayout";
import Loading from "components/Loading/Loading";
import { ToastStatus, showToast } from "components/Toast/Toast";

const Twitch = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  useEffect(() => {
    if (query.code) {
      const redirect_uri = `${window.location.protocol}//${window.location.host}/oauth/twitch`;
      const api = API();
      api
        .post(`${BACKEND_ADDRESS}/oauth/link_twitch`, {
          code: query.code,
          redirect_uri,
        })
        .then(() => {
          showToast({
            message: t("Successfully linked account!"),
            status: ToastStatus.SUCCESS,
          });
          push("/profile");
        })
        .catch(() => {
          showToast({
            message: t("Something went wrong!"),
            status: ToastStatus.WARNING,
          });
          push("/profile");
        });
    }
  });
  return (
    <Layout
      title="Our respectful lineup"
      description="This is what we offer"
      classNames={"top-12 md:top-0"}
    >
      <div>
        <div>{JSON.stringify(query, null, 2)}</div>
        <Loading />
      </div>
    </Layout>
  );
};
export default Twitch;
