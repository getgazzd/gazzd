import EventHistory from "components/EventHistory/EventHistory";
import Layout from "components/Layouts/PageLayout";
import ProtectedPage from "components/ProtectedPage/ProtectedPage";

const _History = () => {
  return <EventHistory />;
};

const ExperienceHistory = () => {
  return (
    <ProtectedPage>
      <_History />
    </ProtectedPage>
  );
};
export default ExperienceHistory;
