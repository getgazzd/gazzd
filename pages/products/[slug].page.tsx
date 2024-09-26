import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { getProductAsync, getProductsAsync } from "store/transfers/productApi";
import { getDeployMarket } from "store/transfers/react_query/markets";
import { Product } from "types/product";

import BackgroundImage from "components/BackgroundImage";
import { ErrorComponent } from "components/ErrorComponent";
import Layout from "components/Layouts/PageLayout";
import { fbPixelViewContent } from "components/MetaPixel/MetaPixel";

import BundleLayout from "./ProductLayouts/BundleLayout";
import MerchandiseLayout from "./ProductLayouts/MerchandiseLayout";
import SuppProductLayout from "./ProductLayouts/SuppProductLayout";

interface Props {
  product: Product;
}

const ProductPage = ({ product }: Props) => {
  useEffect(() => {
    fbPixelViewContent(product);
  }, []);

  if (!product.contentfulProduct) {
    console.error(
      `No matching contentful data exists for product: ${JSON.stringify(
        product
      )}`
    );
    return <ErrorComponent />;
  }

  return (
    <>
      {product?.contentfulProduct?.pageBackground?.fields !== undefined && (
        <BackgroundImage product={product} />
      )}
      <Layout
        title={product?.name as string}
        description={product?.description as string}
        openGraphImages={[
          {
            url: product.media?.["1200x1200"]?.[0] ?? "",
            height: 1200,
            width: 1200,
            alt: product?.name,
          },
        ]}
        noPadding
      >
        {product?.collectionName === "Merchandise" ? (
          <MerchandiseLayout product={product} />
        ) : product.bundleInfo ? (
          <BundleLayout product={product} />
        ) : (
          <SuppProductLayout product={product} />
        )}
      </Layout>
      <style>
        {`
          .product-select::-moz-selection {
            color: black;
            background: ${product?.contentfulProduct?.accentColor};
          }

          ::selection {
            color: black;
            background: ${product?.contentfulProduct?.accentColor};
          }
        `}
      </style>
    </>
  );
};

export default ProductPage;

interface Path {
  params: { slug?: string };
  locale: string;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const deployMarket = await getDeployMarket();
  const { products } = await getProductsAsync({
    market: deployMarket,
  });

  const paths: Path[] = [];

  products.forEach((product) => {
    locales?.forEach((locale: string) => {
      paths.push({
        params: {
          slug: product.uri,
        },
        locale: locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

const pricelistMap = {
  "sv-SE": 19,
  "en-US": 20,
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const deployMarket = await getDeployMarket();

  const productData = await getProductAsync(String(params?.slug), {
    market: deployMarket,
    pricelist: pricelistMap[locale as "sv-SE" | "en-US"],
  });

  return {
    props: {
      product: productData,
    },
    revalidate: 60,
  };
};
