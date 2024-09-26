import axios from "axios";

const CancelToken = axios.CancelToken;
export const cancellationSource = CancelToken.source();

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
export const BACKEND_ADDRESS =
  process.env.NEXT_PUBLIC_BACKEND_ADDRESS ??
  "https://gazzd-backend.herokuapp.com";

export const SOCKET_ADDRESS = `${BACKEND_ADDRESS}/cable`;
export const API = () => {
  let instance = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
  });
  instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  if (typeof window !== "undefined") {
    instance.defaults.headers.common["API-token"] =
      localStorage.getItem("API-token") ?? "";
  } else {
    instance.defaults.headers.common["API-Authorization"] = API_TOKEN;
  }
  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (
        typeof window !== "undefined" &&
        response.data.token &&
        // response.data.loggedIn && // loggedIn is only returned if it's a login/register response
        localStorage.getItem("API-token") !== response.data.token
      ) {
        localStorage.setItem("API-token", response.data.token);
        axios.defaults.headers.common["API-token"] = response.data.token;
      }
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};
