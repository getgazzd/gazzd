import EventHistory from "components/EventHistory/EventHistory";
import Layout from "components/Layouts/PageLayout";
import ProtectedPage from "components/ProtectedPage/ProtectedPage";

const _History = () => {
  return (
    <Layout title="History" description="Profile event history" noPadding>
      <EventHistory />
    </Layout>
  );
};

const History = () => {
  return (
    <ProtectedPage>
      <_History />
    </ProtectedPage>
  );
};
export default History;
