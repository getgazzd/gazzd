import { useCartProgress } from "./useCartProgress";

const CartProgressBar = () => {
  const { cartValue } = useCartProgress();
  return (
    <div id="carBar" className="absolute flex h-full w-[500px] bg-[#FF3366]">
      <span className="absolute right-0 mt-1 whitespace-nowrap text-sm font-bold text-[#FF3366]">
        xp in rucksack: {cartValue}XP
      </span>
    </div>
  );
};

export default CartProgressBar;
