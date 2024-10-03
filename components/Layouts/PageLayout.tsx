import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Script from 'next/script';
import Head from 'next/head'
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

      <Script>
      !function(f, b, e, v, n, t, s)
      {
      	if (f.fbq) return;
      	n = f.fbq = function ()
      	{
      		n.callMethod ?
      			n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      	};
      	if (!f._fbq) f._fbq = n;
      	n.push = n;
      	n.loaded = !0;
      	n.version = '2.0';
      	n.queue = [];
      	t = b.createElement(e);
      	t.async = !0;
      	t.src = v;
      	s = b.getElementsByTagName(e)[0];
      	s.parentNode.insertBefore(t, s)
      }(window, document, 'script',
      	'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '891494069704943');
      fbq('track', 'PageView');
      </Script>
      <Head>
        <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=891494069704943&ev=PageView&noscript=1" /></noscript>
      </Head>
      

      <AnimatePresence exitBeforeEnter>
        <motion.main {...animation} key={title + "GAZZD"}>
          {render()}
        </motion.main>
      </AnimatePresence>
    </>
  );
}

export default Layout;
