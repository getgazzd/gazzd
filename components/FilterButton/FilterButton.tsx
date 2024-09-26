import Link from "next/link";

import Button from "components/Button/Button";
import { fbPixelSearch } from "components/MetaPixel/MetaPixel";

interface Props {
  title: string;
  selected: boolean;
  uri?: string;
}

const FilterButton = ({ title, selected, uri }: Props) => {
  const className = selected
    ? "hover:!bg-white !text-black hover:!text-black"
    : "hover:!bg-transparent !text-white hover:!text-white";
  return (
    <Link href={`/products${selected ? "" : `?category=${uri}`}`} passHref>
      <a>
        <Button
          onClick={() => fbPixelSearch(title)}
          variant={`${selected ? "selected" : "ghost"}`}
          size="smallFluid"
          key={`filter-button-${title}`}
          className={className}
        >
          {title}
        </Button>
      </a>
    </Link>
  );
};

export default FilterButton;
