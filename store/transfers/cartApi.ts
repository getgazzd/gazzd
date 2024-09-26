import { components, paths } from "generatedTypes";

import { API } from "./config";

export const getCartAsync = async ({ filters = {} }: { filters?: object }) => {
  const api = API();
  return api
    .get<components["schemas"]["SelectionResponse"]>(`/selection`, {
      ...filters,
    })
    .then(({ data }) => data);
};

export const addItemToCartAsync = async (
  product?: string,
  quantity?: number
) => {
  const api = API();
  return api
    .post<components["schemas"]["SelectionResponse"]>(
      `/items/${product}/quantity/${quantity}`
    )
    .then(({ data }) => data);
};

export const addOrderToCartAsync = async (
  order:
    | components["schemas"]["OrderCompleteModel"]
    | components["schemas"]["OrderModel"]
) => {
  const api = API();
  return new Promise<components["schemas"]["SelectionResponse"]>(
    async (resolve) => {
      const promises = order?.items?.map(async (item) => {
        try {
          await api.post<components["schemas"]["SelectionResponse"]>(
            `/items/${item.item}/quantity/${item.quantity}`
          );
        } catch (error) {}
        return null;
      });
      if (promises) {
        await Promise.all(promises);
        const data = await getCartAsync({});
        resolve(data);
      }
    }
  );
};

export const increaseQuantityAsync = async (
  line?: string,
  quanitity?: number,
  controller?: AbortController
) => {
  const api = API();
  return api
    .post<components["schemas"]["SelectionResponse"]>(
      `/lines/${line}/quantity/${quanitity}`,
      null
    )
    .then(({ data }) => data);
};

export const decreaseQuantityAsync = async (
  line?: string,
  quantity?: number,
  controller?: AbortController
) => {
  const api = API();
  return api
    .delete<components["schemas"]["SelectionResponse"]>(
      `/lines/${line}/quantity/${quantity}`
    )
    .then(({ data }) => data);
};

export const deleteQuantityAsync = async (
  line?: string,
  controller?: AbortController
) => {
  const api = API();
  return api
    .delete<
      paths["/lines/{line}"]["delete"]["responses"]["200"]["content"]["application/json"]
    >(`/lines/${line}`, {
      signal: controller?.signal,
    })
    .then(({ data }) => data);
};

export const setQuantityAsync = async (line?: string, quantity?: number) => {
  const api = API();
  return api
    .put<components["schemas"]["SelectionResponse"]>(
      `/lines/${line}/quantity/${quantity}`
    )
    .then(({ data }) => data);
};

export const removeItemFromSelectionAsync = async (line: string) => {
  const api = API();
  return api
    .delete<components["schemas"]["SelectionResponse"]>(`/lines/${line}`)
    .then(({ data }) => data);
};
