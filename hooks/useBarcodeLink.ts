import { useEffect, useState } from "react";
import { getContentfulProductByBarcode } from "store/transfer/contentful";
import { ContentfulProduct } from "types/product";

interface Result {
  loading: boolean;
  error: string | undefined;
  barcodeLink: string | undefined;
}

export const useBarcodeLink = (
  barcode: string | string[] | undefined
): Result => {
  const [loading, setLoading] = useState<boolean>(true);
  const [barcodeLink, setBarcodeLink] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!barcode) {
      return;
    }
    if (typeof barcode === "string" && barcode.match(/^[0-9]{13}$/)) {
      getContentfulProductByBarcode("en-US", barcode)
        .then((result: ContentfulProduct) => {
          setBarcodeLink(result.barcodeLink);
          setError(undefined);
          setLoading(false);
        })
        .catch((e) => {
          setError(`An error occured ${JSON.stringify(e)}`);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("The barcode provided is not valid");
    }
  }, [barcode]);

  return { loading, error, barcodeLink };
};
