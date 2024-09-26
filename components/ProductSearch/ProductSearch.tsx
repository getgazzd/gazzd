import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "store/thunks/products";
import SearchField from "components/SearchField/SearchField";

const ProductSearch = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    dispatch(getProducts({ search }));
  }, [search]);

  return (
    <div>
      <SearchField placeholder="Search products" onChange={onChange} />
    </div>
  );
};

export default ProductSearch;
