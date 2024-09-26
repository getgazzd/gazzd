import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { switchSelection } from "store/thunks/selection";

import Layout from "components/Layouts/PageLayout";
import Loading from "components/Loading/Loading";
import { EVENTS, trackEvent } from "helpers/trackEvents";

const CartAbandonmentPage = ({ selection }: { selection: string }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  useEffect(() => {
    const callback = () => {
      trackEvent(EVENTS.OPENED_SHARED_CART)
      push("/checkout")
    };
    dispatch(switchSelection({ selection, callback }));
  }, []);
  return (
    <Layout
      title="Cart Abandonment"
      description="Getting your products..."
      noPadding
    >
      <Loading />
    </Layout>
  );
};
export default CartAbandonmentPage;

export const getServerSideProps = async (context: any) => {
  const selection = context.query.selection;
  return {
    props: { selection }, // will be passed to the page component as props
  };
};
