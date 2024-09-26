import Icon, { IconProps } from "components/Shared/Icon/Icon";
import { useEffect, useState } from "react";

import { useWindowSize } from "hooks/useWindowSize";

interface Props {
  label: string;

  color: string;
}
const itemWidth = 150;

const Marquee = ({ label, color }: Props) => {
  const { windowSize } = useWindowSize();
  const [numberOfItems, setNumberOfItems] = useState(0);

  useEffect(() => {
    setNumberOfItems(Math.round(windowSize.width / itemWidth));
  }, [windowSize]);

  return (
    <div
      style={{ backgroundColor: color ? color : "#fff" }}
      className="absolute top-0 left-0 right-0 h-12 flex flex-row items-center overflow-hidden z-0"
    >
      <div className="flex space-x-4 whitespace-nowrap animate-marquee">
        {[...Array(numberOfItems)].map((item, index) => (
          <MarqueeItem key={"marquee" + index} label={label} />
        ))}
      </div>

      <div className="flex space-x-4 whitespace-nowrap animate-marquee2 absolute">
        {[...Array(numberOfItems)].map((item, index) => (
          <MarqueeItem key={"marquee2" + index} label={label} />
        ))}
      </div>
    </div>
  );
};

export default Marquee;

export const MarqueeItem = ({ label }: { label: string }) => {
  return (
    <div className="flex pl-4 space-x-4">
      <Bolt />
      <h4 className="text-black">{label}</h4>
    </div>
  );
};

export const Bolt = () => {
  return (
    <svg
      width="15"
      height="22"
      viewBox="0 0 15 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.96094 0.5L0.923828 12.5117H6.77734L3.92383 21.6816L6.4668 18.4004L14.5293 8H9.39062L13.0762 0.5H4.96094Z"
        fill="black"
      />
    </svg>
  );
};
