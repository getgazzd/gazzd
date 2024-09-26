import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Badge as IBadge,
  Platform,
  followOnSocialMedia,
  getBadges,
} from "store/transfers/react_query/badges";

type Window = {
  open: (url?: string, arg?: string) => { focus: () => void };
};
declare const window: Window;

const useBadges = () => {
  const [selected, setSelected] = useState<IBadge & { badgeName: string }>();
  const { isLoading, data } = useQuery(["badges"], getBadges);
  const { mutate } = useMutation(followOnSocialMedia);

  const badges = data
    ? Object.keys(data).map((badgeName) => ({ ...data[badgeName], badgeName }))
    : [];

  const socialBadgeClick = () => {
    if (selected?.url && selected?.badgeName) {
      window.open(selected.url, "_blank").focus();
      mutate(selected.badgeName as Platform);
    }
  };
  return { badges, selected, setSelected, socialBadgeClick, isLoading, data };
};
export default useBadges;
