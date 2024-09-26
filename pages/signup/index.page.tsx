import type { NextPage } from "next";

import Signup from "components/Signup/Signup";

import Layout from "../../components/Layouts/PageLayout";

const Index: NextPage = () => {
  return (
    <Layout title="Signup" description="BFF" noPadding verticalCenter>
      <div>
        <Signup />
      </div>
    </Layout>
  );
};

export default Index;
