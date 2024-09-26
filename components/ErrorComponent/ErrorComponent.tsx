import { useTranslation } from "hooks";

import Layout from "components/Layouts/PageLayout";

interface Props {
  children?: JSX.Element;
}

export const ErrorComponent = ({ children }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Layout title="Error" description="error" noPadding>
      {children ? children : <h1>{t("Opps... something went wrong...")}</h1>}
    </Layout>
  );
};
