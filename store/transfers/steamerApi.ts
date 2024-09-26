import { client } from "store/transfer/contentful";
import { Steamer } from "types/steamer";

export const getSteamersAsync = async (): Promise<Steamer[]> => {
  const response = await client.getEntries({
    content_type: "steamer",
  });
  const parsed = client.parseEntries(response);
  return parsed.items.map((steamer: any) => steamer.fields);
};

export const getSteamerAsync = async (handle: string): Promise<Steamer> => {
  const response = await client.getEntries({
    "fields.handle": `${handle}`,
    content_type: "steamer",
    include: 1,
  });
  const parsed = client.parseEntries(response);
  return parsed.items[0].fields;
};
