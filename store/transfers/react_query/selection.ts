import { paths } from "generatedTypes";

import { API, BASE_URL } from "../config";

type SelectionResponse =
  paths["/selection"]["get"]["responses"][200]["content"]["application/json"];

export const getSelection = async (): Promise<SelectionResponse> => {
  const api = API();
  const { data } = await api.get<SelectionResponse>(`${BASE_URL}/selection`);
  return data;
};
