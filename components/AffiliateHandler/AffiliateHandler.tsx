import { load } from "@fingerprintjs/botd";
import { useAffiliateRouting } from "hooks/useAffiliateRouting";
import { ReactNode, useEffect, useState } from "react";

const AffiliateHandler = ({ children }: { children: ReactNode }) => {
  const [finished, setFinished] = useState(false);
  const [botDetectionFinished, setBotDetectionFinished] = useState(false)
  const [isBot, setIsBot] = useState(false)

  const {
    isReady,
    isBigSteamer,
    isOnLandingPage,
    setMarket,
    setAffiliateCookie,
    isMainDomain,
    redirectToMainDomain,
    shouldRedirectToMainDomain,
    redirectToAffiliateDomain,
    shouldRedirectToAffiliateDomain,
    redirectToSteamerPage,
  } = useAffiliateRouting();

  useEffect(() => {
    const botdPromise = load()
    botdPromise
      .then((botd) => botd.detect())
      .then(({ bot }) => {
        setIsBot(bot)
        setBotDetectionFinished(true)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (
      finished ||
      !isReady ||
      window?.location?.hostname.includes("staging")
      || !botDetectionFinished
      || isBot
    ) {
      return;
    }

    if (isMainDomain()) {
      if (shouldRedirectToAffiliateDomain()) {
        redirectToAffiliateDomain();
      } else {
        setMarket();
        setFinished(true);
      }
    } else {
      if (shouldRedirectToMainDomain()) {
        redirectToMainDomain();
      } else {
        setAffiliateCookie();
        setMarket();
        if (isBigSteamer()) {
          if (isOnLandingPage()) redirectToSteamerPage();
        }
        setFinished(true);
      }
    }
    setFinished(true);
  }, [isReady, botDetectionFinished]);

  return <>{children}</>;
};

export default AffiliateHandler;
