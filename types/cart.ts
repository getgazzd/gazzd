import { components } from "generatedTypes";

import { Product } from "./product";

export type Cart = components["schemas"]["SelectionResponse"];

export type Selection = components["schemas"]["SelectionModel"];

export type Item = Partial<components["schemas"]["SelectionItemModel"]> &
  Partial<components["schemas"]["SelectionBundleModel"]> &
  Partial<typeof item>;

const product = { items: [{}] } as Product;
// @ts-ignore
const item = product?.items[0];
