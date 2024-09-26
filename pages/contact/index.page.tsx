import { ContentfulResponse, renderContentfulComponent } from "helpers";
import { GetStaticProps } from "next";
import { getContentful } from "store/transfer/contentful";

import BackgroundImage from "components/BackgroundImage";
import HelpdeskForm from "components/Helpdesk/HelpdeskForm";

import Layout from "../../components/Layouts/PageLayout";

const Index = ({ data }: { data: ContentfulResponse }) => {
  const backgroundSrc = data?.pageBackground?.fields;

  return (
    <>
      <BackgroundImage source={backgroundSrc} />
      <Layout
        title={data?.slug}
        description={data?.title}
        noPadding
        verticalCenter
      >
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-5 p-2">
          <div>
            <h1>{data?.title}</h1>
            <br />
            {data?.content?.map((content) =>
              renderContentfulComponent(content)
            )}
          </div>
          <HelpdeskForm />
        </div>

        <style>{`
        input, textArea {
            background: rgba(0,0,0,0.1);
            border: 1px solid white;
            font-size: 16px!important;
            padding: 14px 10px!important;
            color: #fff!important;
        }
        label {
          color: white;
          transform: translateY(40px);
          font-size: 12px!important;
        }

         .btn {
          float: right;
          width: 100%;
          padding: 8px 40px;
          background: white;
          color: black;
          font-weight: 900;
          border: 1px solid white;
          transition: all 100ms ease-out;
        }
        
         .btn:hover {
          background: rgba(0,0,0,0.1);
          color: white;
        } 
      `}</style>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await getContentful(locale, "contact", "dynamicPage");
  return {
    props: { data },
    revalidate: 60,
  };
};
