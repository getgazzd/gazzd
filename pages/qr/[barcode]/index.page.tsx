import { useBarcodeLink } from "hooks/useBarcodeLink";
import { useRouter } from "next/router";

import Layout from "components/Layouts/PageLayout";
import Loading from "components/Loading/Loading";

const Barcode = () => {
  const router = useRouter();
  const { barcode } = router.query;
  const { loading, barcodeLink, error } = useBarcodeLink(barcode);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return (
      <Layout title="Get barcode link" description="">
        <p>{error}</p>
      </Layout>
    );
  } else if (barcodeLink) {
    window.location.replace(barcodeLink);
  }
  return null;
};

export default Barcode;
