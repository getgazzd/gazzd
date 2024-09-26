import { client } from "store/transfer/contentful";
import { Steamer } from "types/steamer";

export const getSteamers = async (): Promise<Steamer[]> => {
  const response = await client.getEntries({
    content_type: "steamer",
  });
  const parsed = client.parseEntries(response);
  return parsed.items.map((steamer: any) => steamer.fields);
};
