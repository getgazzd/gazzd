import { selectBackendUser, selectOrders } from "store/selectors/user";
import { useDispatch, useSelector } from "react-redux";

import BackgroundImage from "components/BackgroundImage";
import Dashboard from "./dashboard/Dashboard";
import Layout from "../../components/Layouts/PageLayout";
import type { NextPage } from "next";
import ProtectedPage from "components/ProtectedPage/ProtectedPage";
import { _getOrders } from "store/thunks/user";
import { useEffect } from "react";
import { useUserAuthentication } from "hooks/useUserAuthentication";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const user = useSelector(selectBackendUser);

  useEffect(() => {
    dispatch(_getOrders({}));
  }, []);

  if (!orders || !user) return null;
  return (
    <Layout
      title={`DASHBOARD YEAAA!`}
      description="Dashboard for steamers"
      noPadding
    >
      <BackgroundImage page="profile" />
      <Dashboard />
    </Layout>
  );
};

const Index: NextPage = () => {
  return (
    <ProtectedPage>
      <ProfilePage />
    </ProtectedPage>
  );
};

export default Index;
