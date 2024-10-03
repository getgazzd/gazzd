import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { OpenGraph, OpenGraphMedia } from "next-seo/lib/types";
import React, { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
  title: string;
  description: string;
  verticalCenter?: boolean;
  noPadding?: boolean;
  fluid?: boolean;
  classNames?: string;
  openGraphImages?: ReadonlyArray<OpenGraphMedia>
}

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

function Layout({
  children,
  title,
  description,
  fluid = false,
  verticalCenter = false,
  noPadding = false,
  classNames = "",
  openGraphImages
}: Props): JSX.Element {
  const render = () => {
    return (
      <div
        className={`content-area relative z-10 flex max-w-full flex-col items-center pt-24 md:pt-16 ${noPadding ? "" : "py-14 px-4 sm:px-8 md:py-32 md:px-16"
          } ${fluid ? "w-screen" : ""} 
      ${verticalCenter ? "justify-center" : ""} ${classNames}`}
        data-testid="layout"
      >
        {children}
      </div>
    );
  };


  const openGraph: OpenGraph = { title, description }
  if (openGraphImages) {
    openGraph["images"] = openGraphImages
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={openGraph}
      />

      <AnimatePresence exitBeforeEnter>
        <motion.main {...animation} key={title + "GAZZD"}>
          {render()}
        </motion.main>
      </AnimatePresence>
    </>
  );
}

export default Layout;
