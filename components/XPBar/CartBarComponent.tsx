import { useXPBar } from "./useXPBar";
import Icon from "components/Shared/Icon";
import { motion } from "framer-motion";

interface Props {
  width: number;
}
const CartBarComponent = ({ width }: Props) => {
  const { cartValue } = useXPBar();
  return (
    <div className="w-auto relative flex justify-center items-center">
      <div
        className={`bg-midsummerMelon h-1.5 w-[250px]`}
      />
      <div className="absolute right-0 top-2 flex text-sm items-center justify-center">
        <div className="h-5 w-5">
          <Icon type="rucksack" />
        </div>
        <p className="text-sm font-bold mt-1">{cartValue} XP</p>
      </div>
    </div>
  );
};

export default CartBarComponent;
