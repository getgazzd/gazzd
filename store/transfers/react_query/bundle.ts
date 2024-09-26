import { paths } from "generatedTypes";
import { Product } from "types";

import { API } from "../config";

type BundlesResponse =
  paths["/bundles/{product}"]["post"]["responses"][200]["content"]["application/json"];

export const getBundle = async (product: Product): Promise<BundlesResponse> => {
  const api = API();
  const { data } = await api.post<BundlesResponse>(
    `/bundles/${product.product}`,
    {
      includeSectionProducts: "true",
    }
  );

  return data;
};
