import { useRouter } from "next/router";
import { useCategories } from "store/transfers/react_query/categories";

const useFilters = () => {
  const router = useRouter();
  const { data: categories } = useCategories();

  const selected = (router?.query?.category as string)?.split(",") || [];

  const args =
    selected?.length > 0
      ? {
          categories: selected,
        }
      : {};

  return { selected, args, filters: categories?.categories };
};
export default useFilters;
