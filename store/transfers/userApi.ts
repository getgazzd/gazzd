import Bugsnag, { NotifiableError } from "@bugsnag/js";
import { stat } from "fs";
import { components, paths } from "generatedTypes";
import {
  BackendUser,
  SignupForm,
  UpdateForm,
  UserEvent,
  UserResponse,
} from "types/user";
import { GetOrdersArgs, LoggedIn, OrdersResponse } from "types/user/centra";

import { API, BACKEND_ADDRESS } from "./config";

export const registerUserAsync = async (userData: Partial<SignupForm>) => {
  const api = API();
  return api.post<UserResponse>(`/register`, userData).then(({ data }) => data);
};

export const resetPasswordEmailAsync = async (email: string) => {
  const api = API();
  return api
    .post(`/password-reset-email/${email}`, { linkUri: "/reset-password" })
    .then(({ data }) => data);
};

type PasswordData = {
  password: string;
  newPassword: string;
};
export const changePasswordAsync = async (passwordData: PasswordData) => {
  const api = API();
  return api.put(`/password`, passwordData).then(({ data }) => data);
};

export const passwordResetAsync = async (passwordResetData: {
  i: string;
  id: string;
  newPassword: string;
}) => {
  const api = API();
  return api
    .post(`/password-reset`, {
      i: passwordResetData.i,
      id: passwordResetData.id,
      newPassword: passwordResetData.newPassword,
    })
    .then(({ data }) => data);
};

export const loginUserAsync = async (userData: Partial<SignupForm>) => {
  const api = API();
  const email = userData.email;
  const password = userData.password;

  return api
    .post<UserResponse>(`/login/${email}`, { password })
    .then(({ data }) => data);
};

export const logoutUserAsync = async () => {
  const api = API();
  return api.post<void>(`/logout`).then(({ data }) => data);
};

export const getUserAsync = async () => {
  const api = API();
  return api.get<LoggedIn>(`/customer`).then(({ data }) => data);
};

export const emailSubscribeAsync = async (email: string) => {
  const api = API();
  return api.post(`/newsletter-subscription/${email}`).then(({ data }) => data);
};

export const updateUserAsync = async (userData: Partial<UpdateForm>) => {
  const api = API();
  return api
    .put<UserResponse>(`/customer/update`, userData)
    .then(({ data }) => data);
};

export const getOrdersAsync = async (
  args: Partial<
    paths["/orders"]["post"]["requestBody"]["content"]["application/json"]
  > = {}
) => {
  const api = API();
  return api
    .post<components["schemas"]["OrdersResponse"]>(`/orders`, args)
    .then(({ data }) => data);
};

// =========================================================
// ================== GAMIFICATION BACKEND =================
// =========================================================

export const getBackendUserAsync = async (api_token?: string) => {
  const api = API();
  try {
    const { data } = await api.get<BackendUser>(`${BACKEND_ADDRESS}/users`);
    return data;
  } catch (error) {
    if (api_token) {
      const newUser = await createUserForTokenAsync({ api_token });
      if (newUser) return newUser;
    }
    throw "Could not create user when not found";
  }
};

export const getUserEventsAsync = async () => {
  const api = API();
  try {
    const { data } = await api.get<{ events: UserEvent[] }>(
      `${BACKEND_ADDRESS}/users/events`
    );
    return data;
  } catch (error) {
    Bugsnag.notify(
      `Error getting events for backend user. error: ${JSON.stringify(error)}`
    );
    return { events: [] };
  }
};

export const createUserForTokenAsync = async (
  args: Partial<{ api_token: string; invite_token?: string | null }>
) => {
  const api = API();
  try {
    const { data } = await api.post<BackendUser>(
      `${BACKEND_ADDRESS}/users`,
      args
    );
    return data;
  } catch (error) {
    Bugsnag.notify(
      `Error creating backend user for token: ${
        args.api_token
      } error: ${JSON.stringify(error)}`
    );
    return false;
  }
};

export const sendInviteToEmail = async (args: Partial<{ email: string }>) => {
  const api = API();
  try {
    const { data } = await api.post<{ message: string }>(
      `${BACKEND_ADDRESS}/invites`,
      args
    );
    return data;
  } catch (error) {
    return false;
  }
};
