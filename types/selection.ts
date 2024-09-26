import { components } from "generatedTypes";

export type SelectionItem = Partial<
  components["schemas"]["SelectionItemModel"]
> &
  Partial<components["schemas"]["SelectionBundleModel"]>;
