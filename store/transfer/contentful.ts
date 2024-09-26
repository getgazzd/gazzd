import { API, BACKEND_ADDRESS } from "store/transfers/config";
import { ContentfulProduct, HeroProductType } from "types/product";

import { IGazzador } from "types/gazzador";
import { log } from "console";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN_PREVIEW;

export const client = require("contentful").createClient({
  space: space ?? "space missing",
  accessToken: (accessToken || previewAccessToken) ?? "token missing",
  host: accessToken ? "cdn.contentful.com" : "preview.contentful.com",
});

export const getSingleContentfulProduct = async (
  locale?: string,
  slugs?: string
): Promise<ContentfulProduct | undefined> => {
  const contentfulResponse = await client.getEntries({
    locale,
    "fields.slug[in]": String(slugs),
    content_type: "product",
    include: 1,
  });

  const contentfulParsed = client.parseEntries(contentfulResponse);

  return contentfulParsed.items[0]?.fields;
};

export const getAllContentfulProducts = async (
  locale: string,
  slugs: string[]
): Promise<ContentfulProduct[]> => {
  const contentfulResponse = await client.getEntries({
    locale,
    "fields.slug[in]": String(slugs),
    content_type: "product",
  });
  const contentfulParsed = client.parseEntries(contentfulResponse);

  return contentfulParsed.items.map(
    (contentfulProduct: ContentfulProduct) => contentfulProduct.fields
  );
};

export const getContentfulLocales = async () => {
  const response = await client.getLocales();
  return response;
};

export const getContentful = async (
  locale?: string,
  slug?: string,
  contentType?: string
) => {
  const response = await client.getEntries({
    locale,
    "fields.slug": `${slug || ""}`,
    content_type: contentType,
    include: 10,
  });

  const parsed = client.parseEntries(response);
  return parsed?.items[0]?.fields;
};

export const getContentfulHeroProduct = async () => {
  const contentfulResponse = await client.getEntries({
    content_type: "heroProduct",
    include: 1,
  });
  const contentfulParsed = client.parseEntries(contentfulResponse);

  return contentfulParsed.items[0].fields;
};

export const getContentfulSubHeroProducts = async () => {
  const contentfulResponse = await client.getEntries({
    content_type: "subheroProducts",
    include: 10,
  });
  const contentfulParsed = client.parseEntries(contentfulResponse);

  return contentfulParsed;
};

export const getContentfulProductByBarcode = async (
  locale: string = "en-US",
  barcode: string
) => {
  const response = await client.getEntries({
    locale,
    "fields.barcode": barcode,
    content_type: "product",
    include: 1,
  });

  const parsed = client.parseEntries(response);
  return parsed?.items[0]?.fields;
};

export const getContentfulGazzadors = async (
  locale?: string
): Promise<IGazzador[]> => {
  const api = API();
  const response = await api.get(`${BACKEND_ADDRESS}/contentful/gazzadors`);

  const parsed = client.parseEntries(response.data);
  return parsed?.items?.map((i: any) => i.fields);
};
