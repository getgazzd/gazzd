import { useTranslation } from "hooks";
import useBadges from "hooks/useBadges";

import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import Icon from "components/Shared/Icon";

import { Badge } from "./Badge";

const BadgesSection = () => {
  const { t } = useTranslation();
  const { badges, selected, setSelected, isLoading, socialBadgeClick, data } =
    useBadges();

  if (isLoading && !data) return <Loading />;
  return (
    <>
      <div className="w-auto p-4 md:p-16 pt-0 space-y-12 box-border flex justify-center flex-col items-center">
        <h2>{t("boost your exp!")}</h2>
        <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-3 lg:grid-cols-4 w-full">
          {badges.map((badge) => (
            <Badge
              key={badge.title}
              badge={badge}
              select={() => setSelected(badge)}
            />
          ))}
        </div>
      </div>
      <Modal
        open={Boolean(selected)}
        handleClose={() => setSelected(undefined)}
      >
        <div
          className={`w-full relative px-2 h-[175px] select-none flex flex-col group items-center justify-center   text-white transition-colors duration-150  bg-transparent `}
        >
          <div className="mt-6 flex space-y-1 flex-col">
            <span className="text-current text-2xl text-center">
              {selected?.title}
            </span>
            <div className="flex items-center justify-center text-atomicApple text-lg font-bold transition-colors duration-150">
              {selected?.xp} XP
            </div>
          </div>
          <span className="text-center py-4">{selected?.content}</span>
          <div className="flex-1 flex items-center justify-center h-full">
            <Icon type="user" />
          </div>
          {selected?.action === "redirect" && (
            <a
              role="button"
              onClick={socialBadgeClick}
              className="text-center mt-2 text-atomicApple"
            >
              CLICK HERE TO FOLLOW US ON {selected.badgeName} AND COLLECT YOUR
              XP!
            </a>
          )}
        </div>
      </Modal>
    </>
  );
};

export default BadgesSection;
