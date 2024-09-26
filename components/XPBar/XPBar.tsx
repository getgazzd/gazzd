import BarComponent from "./BarComponent";
import CartBarComponent from "./CartBarComponent";
import { useXPBar } from "./useXPBar";
import BorderIcon from "components/Shared/Icon/BorderIcon";
import React from "react";

const XPBar = () => {
  const { prevLevel, currentLevel } = useXPBar();
  return (
    <div className="w-full flex justify-between flex-row items-center">
      <div className=" inline-block whitespace-nowrap w-16 text-center ml-2 text-md">
        {currentLevel?.level}
      </div>
      <div className="w-full flex space-x-0.5">
        <BarComponent width={40} />
        <CartBarComponent width={10} />
      </div>
      <div className="text-black bg-atomicApple inline-block whitespace-nowrap w-6 h-6 text-center mr-2 text-md font-black">
        {currentLevel?.level && currentLevel.level + 1}
      </div>
    </div>
  );
};

export default XPBar;
