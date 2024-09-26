import { useTranslation } from "hooks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "store/selectors/selection";
import {
  selectLevel,
  selectUser,
  selectXP,
  selectXPLoading,
} from "store/selectors/user";
import { getBackendUser } from "store/thunks/user";

import InviteFriend from "components/InviteFriend/InviteFriend";
import Loading from "components/Loading/Loading";

const ProfileXP = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const xp = useSelector(selectXP);
  const level = useSelector(selectLevel);
  const xpLoading = useSelector(selectXPLoading);
  const token = useSelector(selectToken);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBackendUser(token));
  }, [user.token]);

  return (
    <div className="flex flex-col mb-4 md:mt-4 md:mb-9 md:space-y-8 h-full">
      <div className="flex items-end justify-between py-4">
        <p>{t("your exp points")}</p>
        <h4 className="text-md mt-2 inline-block self-start bg-white px-1 font-black text-black">
          {t("LVL")} {level}
        </h4>
      </div>
      {xpLoading || !xp ? (
        <Loading />
      ) : (
        <div>
          <div className="flex items-end">
            <span className="text-7xl md:text-[100px] font-bold">{xp}</span>
            <span className="text-lg md:text-[30px] relative bottom-2">
              {t("XP")}
            </span>
          </div>
        </div>
      )}
      <div className="hidden md:block">
        <InviteFriend />
      </div>
    </div>
  );
};

export default ProfileXP;
