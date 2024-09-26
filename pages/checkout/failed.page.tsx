import type { NextPage } from "next";

import BackgroundImage from "components/BackgroundImage";
import FailedLayout from "components/FailedLayout/FailedLayout";
import Gradient from "components/Gradient";
import Layout from "components/Layouts/PageLayout";

const failed: NextPage = () => {
  return (
    <>
      <BackgroundImage page="products" />

      <Layout title="Oh no!" description="payment failed" verticalCenter>
        <FailedLayout />
      </Layout>

      <Gradient gradientImage="two" />
    </>
  );
};

export default failed;
