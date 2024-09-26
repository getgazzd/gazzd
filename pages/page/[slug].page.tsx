import { ContentfulResponse } from "helpers/contentful";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, getContentful } from "store/transfer/contentful";

import DynamicPage from "components/DynamicPage/DynamicPage";

interface Props {
  data: ContentfulResponse;
}

const Page = ({ data }: Props) => {
  return <DynamicPage data={data} />;
};

export default Page;

interface Path {
  params: { slug: string; locale: string };
}
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const entriesResponse = await client.getEntries({
    content_type: "dynamicPage",
    include: 10,
    locales,
  });

  const parsed = client.parseEntries(entriesResponse);

  let paths: Path[] = [];
  parsed?.items.forEach(
    (item: { fields: { slug: string }; sys: { locale: string } }) => {
      locales?.forEach((locale: string) => {
        paths.push({
          params: { slug: item.fields.slug, locale },
        });
      });
    }
  );

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const data = await getContentful(
    locale,
    params?.slug?.toString(),
    "dynamicPage"
  );
  return {
    props: { data },
    revalidate: 60,
  };
};
