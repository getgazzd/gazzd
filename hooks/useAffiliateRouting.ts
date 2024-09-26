import { useQuery, useQueryClient } from "@tanstack/react-query";
import { log } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMarket } from "store/selectors/selection";
import { updateSelection } from "store/thunks/selection";
import { getCountryAutoAsync } from "store/transfers/react_query/countries";
import { getMarkets } from "store/transfers/react_query/markets";
import { getSteamers } from "store/transfers/react_query/steamers";
import { Steamer } from "types/steamer";

import { deleteCookie, getAffiliateCookie, setCookie } from "../helpers/cookie";

export const NO_REDIRECT_PATHS = ["/reset-password"];

export const LAST_VISIT = "lastSteamerPageVisit";

export const useAffiliateRouting = () => {
  const psl = require("psl");
  const { isLoading, isError } = useQuery(["steamers"], getSteamers, {
    onSuccess: (data) => {
      setMatch(data.find((x: Steamer) => x.handle === domain?.subdomain));
      setMatchFinished(true);
    },
  });
  const { data: marketData, isLoading: marketsLoading } = useQuery(
    ["markets"],
    getMarkets
  );

  const [matchFinished, setMatchFinished] = useState(false);
  const [domain, setDomain] = useState<any>();
  const [match, setMatch] = useState<Steamer>();
  const market = useSelector(selectMarket);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const getRedirectUtils = () => {
    const affiliateCookie = getAffiliateCookie();
    const port = window.location.port ? `:${window.location.port}` : "";
    const protocol = window.location.protocol;
    const pathname = window.location.pathname;

    return {
      affiliateCookie,
      pathname,
      port,
      protocol,
    };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(psl.parse(window.location.hostname));
    }
  }, []);

  const isMainDomain = () => {
    const { protocol } = getRedirectUtils();
    if (window.location.href.startsWith(`${protocol}//${domain.domain}`)) {
      return true;
    }
    return false;
  };

  const shouldRedirectToMainDomain = () => {
    const { affiliateCookie, protocol } = getRedirectUtils();
    if (!match && domain?.domain) {
      if (
        (process.env.NODE_ENV === "production" ||
          process.env.NEXT_PUBLIC_LOCAL_AFFILIATE === "true") &&
        !window.location.href.startsWith(`${protocol}//${domain.domain}`)
      ) {
        return true;
      }
    }
    return false;
  };

  const setAffiliateCookie = () => {
    if (match) {
      deleteCookie(domain);
      setCookie({
        domain: domain,
        expirationDays: 30,
      });

      queryClient.invalidateQueries(["steamer"]);
    }
  };

  const setMarket = async () => {
    const { country } = await getCountryAutoAsync();
    if (marketData?.markets?.find((m) => m.market === match?.market)) {
      dispatch(
        updateSelection({
          market: match?.market,
          country: country?.country,
        })
      );
    } else {
      const defaultMarket = marketData?.markets?.find(
        (m) => m.default === true
      );

      dispatch(
        updateSelection({
          market: defaultMarket?.market,
          country: country?.country,
        })
      );
    }
  };

  const isBigSteamer = () => {
    if (match?.steamerPage) return true;
    return false;
  };

  const isOnLandingPage = () => {
    return window.location.pathname === "/";
  };

  const redirectToMainDomain = () => {
    const { port, protocol, pathname } = getRedirectUtils();
    window.location.replace(`${protocol}//${domain.domain}${port}${pathname}`);
  };

  const shouldRedirectToAffiliateDomain = () => {
    const { affiliateCookie, pathname } = getRedirectUtils();
    if (
      !match &&
      affiliateCookie !== "" &&
      domain?.subdomain !== affiliateCookie &&
      domain?.domain &&
      !NO_REDIRECT_PATHS.includes(pathname)
    ) {
      return true;
    }
    return false;
  };

  const redirectToAffiliateDomain = () => {
    const { port, protocol, affiliateCookie, pathname } = getRedirectUtils();
    window.location.replace(
      `${protocol}//${affiliateCookie}.${domain.domain}${port}${pathname}`
    );
  };

  const hasVisitedSteamerPageToday = () => {
    const lastVisit = localStorage.getItem(LAST_VISIT);
    if (!lastVisit) return false;

    const today = new Date().toDateString();
    return lastVisit === today;
  };

  const redirectToSteamerPage = () => {
    const { affiliateCookie } = getRedirectUtils();
    const now = new Date().toDateString();

    if (!hasVisitedSteamerPageToday()) {
      localStorage.setItem(LAST_VISIT, now);
      push(`/steamer/${affiliateCookie}`);
    }
  };

  const isReady =
    !isLoading && !isError && domain && !marketsLoading && matchFinished;

  return {
    isReady,
    domain,
    redirectToSteamerPage,
    setMarket,
    isOnLandingPage,
    isBigSteamer,
    isMainDomain,
    setAffiliateCookie,
    shouldRedirectToMainDomain,
    redirectToMainDomain,
    shouldRedirectToAffiliateDomain,
    redirectToAffiliateDomain,
  };
};
