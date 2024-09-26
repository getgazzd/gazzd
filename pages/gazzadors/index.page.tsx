import { useEffect, useState } from "react";

import BackgroundImage from "components/BackgroundImage";
import Gazzador from "components/Gazzador/Gazzador";
import { GetStaticProps } from "next";
import { IGazzador } from "types/gazzador";
import Layout from "components/Layouts/PageLayout";
import { getContentfulGazzadors } from "store/transfer/contentful";
import { motion } from "framer-motion";

interface Props {
  gazzadors: IGazzador[];
  locale: string;
}

const sortLive = (a: any, b: any) => {
  if (a.is_live && !b.is_live) return -1;
  if (!a.is_live && b.is_live) return 1;
  return 0;
};

const randomizeData = (data: any[]) => {
  return data
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const getOpenGraphImages = (gazzadors: IGazzador[]) => {
  return gazzadors.map(gazzador => {
    const { height, width } = gazzador?.image?.fields?.file?.details?.image;
    return {
      url: "https:" + gazzador?.image?.fields?.file?.url + "?w=600",
      width: 600,
      height: height / width * 600,
      alt: gazzador.title
    }
  })
}

const Index = ({ gazzadors: _gazzadors, locale }: Props) => {
  const [gazzadors, setGazzadors] = useState<IGazzador[]>(
    _gazzadors.sort(sortLive)
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getContentfulGazzadors(locale).then((data: IGazzador[]) => {
      const mixed = randomizeData(data)
      const liveSorted = mixed.sort(sortLive);
      setGazzadors(liveSorted);
      setLoaded(true);
    });
  }, []);


  const openGraphImages = getOpenGraphImages(gazzadors)
  return (
    <>
      <BackgroundImage fixed fluid page="gazzadors" />
      <Layout title="Gazzadors" description="Our collaborators" noPadding openGraphImages={openGraphImages} >
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 md:p-16 w-full m-auto max-w-7xl"
          variants={gazzadorContainerAnimation}
          initial="hidden"
          animate="show"
        >
          {gazzadors.map((gazzador: any) => (
            <Gazzador key={gazzador.title} gazzador={gazzador} />
          ))}
        </motion.div>
      </Layout>
    </>
  );
};
export default Index;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const data = await getContentfulGazzadors(locale);
  return {
    props: { gazzadors: data, locale },
    revalidate: 60,
  };
};

const gazzadorContainerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 1.3,
      delay: 1,
    },
  },
};
