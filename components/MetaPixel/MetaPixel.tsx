import { useEffect } from "react";
import { Product } from "types";

let ReactPixel: any = null;

export const MetaPixel = () => {
  useEffect(() => {
    if (!ReactPixel) {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((currReactPixel) => {
          ReactPixel = currReactPixel;
          console.debug("[ReactPixel]: Init");
          ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
          ReactPixel.pageView();
        });
    }
  }, []);

  return null;
};

export const fbPixelAddToCart = async () => {
  if (ReactPixel) {
    console.debug("[ReactPixel]: AddToCart");
    ReactPixel.fbq("track", "AddToCart");
  }
};

export const fbPixelInitiateCheckout = async () => {
  if (ReactPixel) {
    console.debug("[ReactPixel]: InitiateCheckout");
    ReactPixel.fbq("track", "InitiateCheckout");
  }
};

export const fbPixelViewContent = async (product: Product) => {
  if (ReactPixel) {
    console.debug("[ReactPixel]: ViewContent");
    ReactPixel.fbq("track", "ViewContent", {
      content_ids: product?.sku,
      content_name: product?.name,
      content_type: "product",
      value: product?.price,
    });
  }
};

export const fbPixelPurchase = async () => {
  if (ReactPixel) {
    console.debug("[ReactPixel]: Purchase");
    ReactPixel.fbq("track", "Purchase");
  }
};

export const fbPixelLead = async () => {
  if (ReactPixel) {
    console.debug("[ReactPixel]: Lead");
    ReactPixel.fbq("track", "Lead");
  }
};

export const fbPixelSearch = async (searchString: string) => {
  if (ReactPixel) {
    console.debug("[ReactPixel]: Search");
    ReactPixel.fbq("track", "Search", {
      search_string: searchString,
    });
  }
};
