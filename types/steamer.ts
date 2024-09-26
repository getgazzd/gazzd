import { ContentfulProduct } from "./product";

export interface Steamer {
  steamerPage: boolean;
  handle: string;
  percentOff: number;
  market: string;
  fullName: string;
  description: string;
  accentColor: string;
  favoriteProduct: ContentfulProduct;
  cookieExpirationDays: number;
  lockImageToTop: boolean;
  socialMediaLinks: [];
  vectorBackground: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
  avatar: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
  profilePicture: {
    fields: {
      file: {
        url: string;
        details: { image: { width: number; height: number } };
      };
    };
  };
}

export interface SteamersRespone {
  token: string;
  steamers: Steamer[];
}

export interface SteamerResponse {
  token: string;
  steamer: Steamer;
}
