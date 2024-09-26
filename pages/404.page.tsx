import type { NextPage } from "next";
import Link from "next/link";

import BackgroundImage from "components/BackgroundImage";
import Button from "components/Button/Button";

import Layout from "../components/Layouts/PageLayout";

const Home: NextPage = () => {
  return (
    <>
      <BackgroundImage page="landing" fixed fluid />

      <Layout
        title="GODLIKE FLAVORS"
        description="mix up your game"
        verticalCenter
      >
        <div className="flex space-y-4 flex-col  justify-center container items-center ">
          <h1>Oh No! FoUR oh four</h1>
          <Link passHref href="/">
            <Button variant="ghost">Get back & get gazzd</Button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;
