import { useQuery } from "@tanstack/react-query";
import { paths } from "generatedTypes";
import { type } from "os";

import { API } from "../config";

type CategoriesResponse =
  paths["/categories"]["post"]["responses"][200]["content"]["application/json"];

type CategoriesArgs =
  paths["/categories"]["post"]["requestBody"]["content"]["application/json"];

export const getCategoriesAsync = async (
  args?: CategoriesArgs
): Promise<CategoriesResponse> => {
  const api = API();
  const { data } = await api.post<CategoriesResponse>("/categories", args);
  return data;
};

export const useCategories = (args?: CategoriesArgs) => {
  const response = useQuery(["categories"], () => getCategoriesAsync(args));

  return response;
};
