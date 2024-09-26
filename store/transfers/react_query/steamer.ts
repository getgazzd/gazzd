import { getAffiliateCookie } from "helpers/cookie";
import { client } from "store/transfer/contentful";
import { Steamer } from "types/steamer";

export const getSteamer = async (): Promise<Steamer | null> => {
  const handle = getAffiliateCookie();
  if (handle) {
    const response = await client.getEntries({
      "fields.handle": `${handle}`,
      content_type: "steamer",
      include: 1,
    });
    const parsed = client.parseEntries(response);
    return parsed?.items[0]?.fields;
  } else return null;
};
