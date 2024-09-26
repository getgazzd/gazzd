import {
  ContentfulResponse,
  renderContentfulComponent,
} from "helpers/contentful";
import Image from "next/image";

import Layout from "components/Layouts/PageLayout";

interface Props {
  data: ContentfulResponse;
}

export const DynamicPage = ({ data }: Props) => {
  const backgroundSrc = data?.pageBackground?.fields.file.url;
  return (
    <>
      {backgroundSrc ? (
        <div className="absolute inset-0 flex flex-col overflow-hidden">
          <Image
            src={"https:" + backgroundSrc}
            alt="image"
            layout="fill"
            className="pointer-events-none absolute object-cover object-center mix-blend-hard-light"
          />
        </div>
      ) : (
        ""
      )}
      <Layout title={data?.slug} description={data?.title}>
        <div className="flex justify-center items-center md:pt-16">
          <div className="flex w-full md:max-w-lg justify-center flex-col space-y-16 self-start static-links">
            <h1>{data?.title}</h1>
            {data?.content?.map((content) =>
              renderContentfulComponent(content)
            )}
          </div>
        </div>
      </Layout>
      <style>{`
      .static-links a{
        color: #3344ff;
      }`}</style>
    </>
  );
};

export default DynamicPage;
