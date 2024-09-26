import { GetStaticProps, NextPage } from "next";
import { getSteamersAsync } from "store/transfers/steamerApi";
import { Steamer } from "types/steamer";

interface Props {
  steamers: Steamer[];
}

const Index: NextPage<Props> = ({ steamers }) => {
  return (
    <>
      <div className="h-[900px] p-32">steamer</div>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const steamers = await getSteamersAsync();

  return {
    props: { steamers },
    revalidate: 60,
  };
};
