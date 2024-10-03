import Head from "next/head";

const MetaTags = () => {
  return (
    <Head>
      <meta
        name="facebook-domain-verification"
        content={`${process.env.NEXT_PUBLIC_FACEBOOK_ID}`}
      />
    </Head>
  );
};

export default MetaTags;
