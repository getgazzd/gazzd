import { paths } from "generatedTypes";

import { API, BACKEND_ADDRESS } from "../config";

type MarketResponse =
  paths["/markets"]["get"]["responses"][200]["content"]["application/json"];

export const getMarkets = async (): Promise<MarketResponse> => {
  const api = API();
  const { data } = await api.get<MarketResponse>(`${BACKEND_ADDRESS}/markets`);
  return data;
};

export const getDeployMarket = async () => {
  const { markets } = await getMarkets();
  let deployMarket = markets?.find((m) => m.name === "Deploy market");
  if (!deployMarket) deployMarket = markets?.find((m) => m.default);
  return deployMarket?.market;
};
