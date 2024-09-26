import Icon, { IconProps } from "../Icon";

const BorderIcon = ({ type }: IconProps) => {
  return (
    <div className=" flex h-12 w-12 select-none items-center justify-center px-3 md:h-16 md:w-16 md:px-0">
      <Icon type={type} />
    </div>
  );
};

export default BorderIcon;
