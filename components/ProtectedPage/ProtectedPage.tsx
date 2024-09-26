import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserIsAuthenticated } from "store/selectors/user";
import { authFailedForUser } from "store/slices/userSlice";
import { getUserAsync } from "store/transfers/userApi";

import Layout from "components/Layouts/PageLayout";
import Loading from "components/Loading/Loading";

const ProtectedPage: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const isAuthenticated = useSelector(selectUserIsAuthenticated);

  const checkUser = async () => {
    try {
      await getUserAsync();
    } catch (error) {
      setHasError(true);
      dispatch(authFailedForUser());
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) push("/login");
  }, [isAuthenticated]);

  if (loading)
    return (
      <Layout title="Loading" description="Loading">
        <Loading />
      </Layout>
    );
  if (hasError) {
    console.error("Somerhing went wrong in user session");
    return <Layout title="error" description="error" />;
  }

  return <>{children}</>;
};
export default ProtectedPage;
