import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CentraCheckoutHandler from "hoc/CentraCheckoutHandler/CentraCheckoutHandler";
import CountryHandler from "hoc/CountryHandler/CountryHandler";
import ErrorMonitor from "hoc/ErrorMonitor/ErrorMonitor";
import MetaTags from "hoc/MetaTags/MetaTags";
import Posthog from "hoc/Posthog/Posthog";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import oGraphImg from "public/opengraph/opengraph.jpg";
import CookieConsent from "react-cookie-consent";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store } from "store";

import AffiliateHandler from "components/AffiliateHandler";
import Analytics from "components/Analytics/Analytics";
import HelpdeskSetup from "components/Helpdesk/HelpdeskSetup";
import AppBorder from "components/Layouts/AppBorder";
import { MetaPixel } from "components/MetaPixel/MetaPixel";
import NotificationManager from "components/NotificationManager";
import Snowflakes from "components/Snowflakes/Snowflakes";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://www.gazzd.com${router?.asPath}`;
  return (
    <ErrorMonitor>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CountryHandler>
            <HelpdeskSetup />
            <Analytics />
            <CentraCheckoutHandler />
            <GoogleTagManager gtmId="G-947LZ5C50D" />
            <GoogleAnalytics gaId="G-947LZ5C50D" />
            <Posthog />
            <MetaTags />
            <MetaPixel />
            <DefaultSeo
              titleTemplate="GAZZD - %s"
              openGraph={{
                title: "GAZZD - MIX UP YOUR GAME",
                type: "website",
                locale: "en_IE",
                url,
                description: "Godlike flavors - Packed with energy ",
                site_name: "GAZZD | gazzd.com",
                images: [
                  {
                    url: oGraphImg.src,
                    width: oGraphImg.width,
                    height: oGraphImg.height,
                    alt: "GAZZD",
                  },
                ],
              }}
              canonical={url}
            />
            <NotificationManager />
            <AppBorder>
              <AffiliateHandler>
                <>
                  {/* @ts-ignore */}
                  <Component {...pageProps} key={url} canonical={url} />
                  <Snowflakes />
                </>
              </AffiliateHandler>
            </AppBorder>
            <CookieConsent
              location="bottom"
              buttonText="Accept"
              cookieName="gazzd-cookie-consent"
              style={{ background: "#2B373B" }}
              buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
              expires={150}
            >
              <span style={{ fontSize: "14px" }}>
                We use cookies for analytics and to improve our site. By
                clicking Accept, you agree to our use of cookies. For more
                information, please see our Privacy Policy.{" "}
                <a
                  href="/privacy-policy"
                  style={{ color: "#fff", textDecoration: "underline" }}
                >
                  Learn more
                </a>
              </span>
            </CookieConsent>
          </CountryHandler>
        </QueryClientProvider>
      </Provider>
    </ErrorMonitor>
  );
}

export default MyApp;
