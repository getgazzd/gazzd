import { API, BACKEND_ADDRESS } from "../config";

export interface Badge {
  title: string;
  claimed: boolean;
  xp: number;
  action: "dialog" | "redirect";
  content?: string;
  url?: string;
}

export interface SocialMediaEvent {
  id: number;
  user_id: number;
  event_type: string;
  payload: {
    user_id: number;
    platform: string;
    multiplier: number;
    points: number;
    user_level: number;
  };
  created_at: string;
  updated_at: string;
}

export interface Badges {
  [badge: string]: Badge;
}

export type Platform = "instagram" | "tiktok" | "twitter";

export const getBadges = async (): Promise<Badges> => {
  const api = API();
  const { data } = await api.get<Badges>(`${BACKEND_ADDRESS}/events`);
  return data;
};

export const followOnSocialMedia = async (
  platform: Platform
): Promise<SocialMediaEvent> => {
  const api = API();
  const { data } = await api.post<SocialMediaEvent>(
    `${BACKEND_ADDRESS}/events/followed_on_social_media`,
    { platform }
  );
  return data;
};
