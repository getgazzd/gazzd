import { isServer } from "helpers/localStorage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken } from "store/selectors/user";
import { updateBackendUser } from "store/slices/userSlice";
import { getUserEvents } from "store/thunks/user";
import { SOCKET_ADDRESS } from "store/transfers/config";
import { getBackendUserAsync } from "store/transfers/userApi";
import { BackendUser } from "types";

import { ToastStatus, showToast } from "./../components/Toast/Toast";
import { useUserAuthentication } from "./useUserAuthentication";

interface Payload extends BackendUser {
  message: string;
}
export interface SocketAction {
  TYPE: string;
  PAYLOAD: Payload;
}

export const useSocket = () => {
  const { isAuthenticated } = useUserAuthentication();
  const token = useSelector(selectUserToken);
  const cableRef = useRef();
  const [isSetup, set] = useState(false);
  const dispatch = useDispatch();

  const update = () => {
    dispatch(getUserEvents());
  };

  const setupSocket = (centra_id: string) => {
    const actionCable = require("actioncable");
    const cable = actionCable.createConsumer(SOCKET_ADDRESS);
    cableRef.current = cable;
    cable.subscriptions.create(
      {
        channel: "UserChannel",
        centra_id,
      },
      {
        connected: () => {
          console.log("SOCKET CONNECTED");
          set(true);
        },
        disconnected: () => {
          console.log("SOCKET DISCONNECTED");
          set(false);
        },
        received: (action: SocketAction) => {
          const { message, ...user } = action.PAYLOAD;
          switch (action.TYPE) {
            case "TEST_EVENT":
              showToast({ message: message, status: ToastStatus.INFO });
              break;
            case "LEVEL_UP":
              showToast({
                message: "Grats you are level: " + user.level,
                status: ToastStatus.SUCCESS,
              });
              break;
            case "POINTS_REGISTERED":
              update();
              showToast({
                status: ToastStatus.SUCCESS,
                message: action.PAYLOAD.message,
              });
              dispatch(updateBackendUser(user));
              break;
            case "UPDATE_BACKEND_USER":
              dispatch(updateBackendUser(user));
              break;
            default:
              break;
          }
        },
      }
    );
  };

  useEffect(() => {
    if (isServer() || !isAuthenticated) return;
    if (!isAuthenticated && cableRef.current) {
      (cableRef.current as { disconnect: () => void })?.disconnect();
    }
    const init = async () => {
      const user = await getBackendUserAsync(token);
      if (!isSetup && user && !cableRef.current) {
        setupSocket(user.centra_id);
      }
    };
    init();
    return () =>
      cableRef.current &&
      (cableRef.current as { disconnect: () => void })?.disconnect();
  }, [token, isAuthenticated]);
};

export default useSocket;
