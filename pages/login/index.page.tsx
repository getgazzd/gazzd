import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUserIsAuthenticated } from "store/selectors/user";

import Login from "components/Login";

import Layout from "../../components/Layouts/PageLayout";

const Index: NextPage = () => {
  const isAuthenticated = useSelector(selectUserIsAuthenticated);
  const { push } = useRouter();

  if (isAuthenticated) push("/profile");
  return (
    <Layout title="Login" description="Almost there" noPadding>
      <Login />
    </Layout>
  );
};

export default Index;
