import useFilters from "hooks/useFilters";
import useTranslation from "hooks/useTranslation";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  selectProductsLoading,
} from "store/selectors/products";
import { getProducts } from "store/thunks/products";

import BackgroundImage from "components/BackgroundImage";
import Filters from "components/Filters/Filters";
import Loading from "components/Loading/Loading";
import ProductsGrid from "components/ProductsGrid/ProductsGrid";

import Layout from "../../components/Layouts/PageLayout";

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const { t } = useTranslation();
  const { args } = useFilters();

  useEffect(() => {
    dispatch(getProducts(args.categories ? args.categories?.[0] : args));
  }, []);

  return (
    <>
      {loading ? null : <BackgroundImage page="products" fluid />}

      <Layout
        title="Our respectful lineup"
        description="This is what we offer"
        classNames={"md:top-12"}
      >
        <h1>{t("our respectful lineup")}</h1>
        <Filters />
        <div>
          {loading ? <Loading /> : <ProductsGrid products={products} />}
        </div>
      </Layout>
    </>
  );
};

export default Index;
