import { paths } from "generatedTypes";

import { API } from "../config";

type CountryResponse =
  paths["/countries/auto"]["get"]["responses"][200]["content"]["application/json"];

export const getCountryAutoAsync = async (): Promise<CountryResponse> => {
  const api = API();
  const { data } = await api.get<CountryResponse>("/countries/auto");
  return data;
};
