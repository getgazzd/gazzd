import { SelectionItem } from "types/selection";

export const itemsAreOnlyBundles = (items?: SelectionItem[]) =>
  items &&
  items.reduce((prev, current) => {
    if (!current.bundle) return false;
    return prev;
  }, true);
