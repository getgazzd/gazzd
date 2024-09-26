import { client } from "store/transfer/contentful";

export const getLandingPage = async (): Promise<any> => {
  const response = await client.getEntries({
    content_type: "landingpage",
    include: 10,
  });
  const parsed = client.parseEntries(response);
  return parsed;
};
