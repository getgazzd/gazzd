import { GetStaticPaths, GetStaticProps } from "next";
import { getSteamerAsync, getSteamersAsync } from "store/transfers/steamerApi";

import BackgroundImage from "components/BackgroundImage";
import BundleProductCard from "components/ProductCard/BundleProductCard";
import DynamicContent from "components/DynamicContent";
import Image from "next/image";
import Layout from "components/Layouts/PageLayout";
import ProductCard from "components/ProductCard/ProductCard";
import SocialMedia from "./SocialMedia";
import { Steamer } from "types/steamer";
import { useGetFavouriteSteamerProduct } from "hooks/useGetFavouriteSteamerProduct";

const SteamerPage = ({ steamer }: { steamer: Steamer }) => {
  const profile = {
    src: "https:" + steamer.profilePicture.fields.file.url,
    width: steamer.profilePicture.fields.file.details.image.width,
    height: steamer.profilePicture.fields.file.details.image.height,
  };
  const { product } = useGetFavouriteSteamerProduct(steamer);

  return (
    <>
      <BackgroundImage fluid steamer={steamer} />
      <SteamerGradient steamer={steamer} />
      <Layout
        title={steamer?.handle as string}
        description={steamer?.description as string}
        noPadding
      >
        <div className="grid auto-cols-auto grid-cols-1 xl:grid-cols-12 min-h-[calc(100vh-(theme(spacing.32)))] container xl:-ml-32 max-w-screen ">
          <div
            className={`xl:col-span-8 xl: col-span-6 xl:relative xl:max-h-[100vh] md:max-w-5xl ${steamer.lockImageToTop ? "-mt-16" : ""
              }`}
          >
            <Image
              src={profile.src}
              alt={steamer.handle}
              layout="responsive"
              width={profile.width}
              height={profile.height}
            />
          </div>
          <div className=" xl:col-start-9 xl:col-span-4 mx-4 xl:mx-8 xl:mt-4 flex justify-center">
            <div className="flex flex-col items-start justify-center">
              <div className="space-y-2 mb-2">
                <h1>{steamer.handle}</h1>
                <h4 style={{ color: steamer.accentColor }}>
                  {steamer.fullName}
                </h4>
              </div>
              <div>
                <SocialMedia steamer={steamer} />
              </div>

              <div className="w-full">
                {/* @ts-ignore */}
                <DynamicContent content={steamer?.description} />
              </div>
              <div className="w-full max-w-[425px] mb-16">
                {product && product.collectionName === "Bundle" ? (
                  <BundleProductCard steamer={steamer} product={product} />
                ) : (
                  product && <ProductCard product={product} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SteamerPage;

export const SteamerGradient = ({ steamer }: { steamer: Steamer }) => {
  return (
    <>
      <div
        style={{
          background: `radial-gradient(circle, ${steamer.accentColor} 0%, rgba(0,0,0,0) 100%)`,
        }}
        className="fixed inset-0 opacity-[15%]"
      />
    </>
  );
};

interface Path {
  params: { handle?: string };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Path[] = [];
  const steamers = await getSteamersAsync();

  steamers?.map(
    (steamer: Steamer) =>
      steamer.steamerPage && paths.push({ params: { handle: steamer.handle } })
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const steamer = await getSteamerAsync(String(params?.handle));

  return {
    props: { steamer: steamer },
    revalidate: 60,
  };
};
