export const setLocalStorage = (key: string, status: string) => {
  if (!isServer()) {
    localStorage.setItem(key, status);
  }
};

export const getLocalStorage = (key: string): string | null => {
  if (!isServer()) {
    return localStorage.getItem(key);
  } else {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  if (!isServer()) {
    return localStorage.getItem("authenticated") === "true";
  }
  return false;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getAPIToken = (): boolean => {
  if (!isServer()) {
    return true;
  } else {
    return false;
  }
};

export const isServer = () => typeof window === "undefined";
