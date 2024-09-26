import { RootState } from "store";

export const selectUser = (state: RootState) => state.user.user;
export const selectBackendUser = (state: RootState) => state.user.backendUser;

export const selectUserIsLoading = (state: RootState) => state.user.loading;
export const selectEventsIsLoading = (state: RootState) =>
  state.user.eventsLoading;

export const selectUserIsAuthenticated = (state: RootState) =>
  state.user.loggedIn;

export const selectOrders = (state: RootState) => state.user.orders;
export const selectOrdersLoading = (state: RootState) =>
  state.user.ordersLoading;

export const selectXP = (state: RootState) => state.user.backendUser?.xp;
export const selectLevel = (state: RootState) => state.user.backendUser?.level;
export const selectCurrentLevel = (state: RootState) =>
  state.user.backendUser?.current_level;
export const selectPrevLevel = (state: RootState) =>
  state.user.backendUser?.prev_level;

export const selectInviteToken = (state: RootState) =>
  state.user.backendUser?.invite_token;
export const selectXPLoading = (state: RootState) => state.user.xpLoading;
export const selectEvents = (state: RootState) => state.user.events;
export const selectUserToken = (state: RootState) => state.user.user.token;

export const selectCentraErrors = (state: RootState) => state.user.error.centra;
