import { Badge as IBadge } from "store/transfers/react_query/badges";

import Icon from "components/Shared/Icon";

export const Badge = ({
  badge,
  select,
}: {
  badge: IBadge;
  select: () => void;
}) => {
  return (
    <>
      <div
        role="button"
        className={`w-full relative px-2 h-[175px] select-none flex flex-col group items-center justify-center border hover:bg-atomicApple text-white transition-colors duration-150 ${
          badge.claimed
            ? "bg-atomicApple/20 opacity-40 border-borderGray hover:bg-streakingStrawberries pointer-events-none"
            : "border-borderGray bg-transparent hover:text-black"
        }`}
        onClick={select}
      >
        <div className="mt-6 flex space-y-1 flex-col">
          <div className="flex items-center justify-center text-atomicApple text-lg font-bold group-hover:text-black transition-colors duration-150">
            {badge.xp} XP
          </div>
          <span className="text-current text-sm text-center">
            {badge.title}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center h-full">
          <Icon type="user" />
        </div>
      </div>
    </>
  );
};
