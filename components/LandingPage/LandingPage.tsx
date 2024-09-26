import { AnimatePresence } from "framer-motion";
import BackgroundImage from "components/BackgroundImage";
import Layout from "components/Layouts/PageLayout";
import Marquee from "components/Marquee";
import React from "react";
import { getLandingPage } from "store/transfers/react_query/landingpage";
import { renderContentfulComponent } from "helpers";
import { useQuery } from "@tanstack/react-query";

const LandingPage = () => {
  const { data, isLoading } = useQuery(["landingpage"], getLandingPage);
  if (!data) return null;
  const contents = data.items[0].fields;

  return (
    <AnimatePresence>
      <BackgroundImage page="landing" />

      {data && !isLoading && (
        <>
          <Layout
            title="GODLIKE FLAVORS"
            description="mix up your game"
            noPadding
          >
            <div className="grid row-span-full border-l border-r border-borderGray">
              {data &&
                data?.items[0]?.fields?.content?.map(
                  (child: any, index: number) => {
                    return (
                      <div key={"child" + index} className="relative">
                        <div className="z-10 relative">
                          {renderContentfulComponent(child)}
                        </div>
                        {contents.marquee && (
                          <Marquee
                            label={contents.marquee}
                            color={contents.marqueeColor}
                          />
                        )}
                      </div>
                    );
                  }
                )}
            </div>
          </Layout>
        </>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
