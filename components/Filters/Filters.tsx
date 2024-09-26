import useFilters from "hooks/useFilters";

import FilterButton from "components/FilterButton/FilterButton";

const Filters = () => {
  const { selected, filters } = useFilters();

  const filterIsSelected = (uri?: string) => selected?.includes(String(uri));

  return (
    <div
      className="mb-8 w-full overflow-x-auto py-2 md:py-4"
      data-testid="filter"
    >
      <div className="mx-auto grid grid-flow-col gap-4 md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 xl:w-2/3">
        {filters?.map((filter) => {
          return (
            <FilterButton
              key={filter.uri}
              title={String(filter.name?.[0])}
              selected={filterIsSelected(filter.uri)}
              uri={filter.uri}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
