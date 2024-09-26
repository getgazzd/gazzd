import { FormEvent } from "react";
import Input from "components/Input";
import SearchIcon from "components/Icons/SearchIcon";

interface Props {
  placeholder: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
}

const SearchField = ({ onChange, placeholder = "Search" }: Props) => {
  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <Input
        placeholder={placeholder}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        onChange={onChange}
        icon={<SearchIcon />}
      />
    </div>
  );
};

export default SearchField;
