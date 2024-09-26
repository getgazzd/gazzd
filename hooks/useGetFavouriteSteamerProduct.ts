import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUpdatedMarket } from "store/selectors/selection";
import { getProductAsync } from "store/transfers/productApi";
import { Steamer } from "types/steamer";

export const useGetFavouriteSteamerProduct = (steamer: Steamer, args = {}) => {
  const slug = steamer.favoriteProduct.fields.slug;
  const updatedMarket = useSelector(selectUpdatedMarket);

  const { data } = useQuery({
    queryKey: ["steamerProduct"],
    queryFn: () => getProductAsync(slug),
    enabled: updatedMarket,
  });

  return { product: data };
};
