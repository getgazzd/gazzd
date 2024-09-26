import Icon from "components/Shared/Icon";
import { motion } from "framer-motion";

interface Props {
  width: number;
}
const BarComponent = ({ width }: Props) => {
  return (
    <div className="w-auto relative flex justify-center items-center">
      <div
        // style={{ width: width + "%" }}
        className={`bg-atomicApple h-1.5 w-[250px]`}
      />
    </div>
  );
};

export default BarComponent;
