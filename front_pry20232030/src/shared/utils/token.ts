import { setCookie, getCookie, removeCookie } from "./cookies";

export const getAccessToken = () => {
  return getCookie("accessToken");
};

export const setAccessToken = (token: string) => {
  setCookie("accessToken", token, 1);
};

export const removeAccessToken = () => {
  removeCookie("accessToken");
};

export const getRefreshToken = () => {
  return getCookie("refreshToken");
};

export const setRefreshToken = (token: string) => {
  setCookie("refreshToken", token, 1);
};

export const removeRefreshToken = () => {
  removeCookie("refreshToken");
};

export const getLoginUser = () => {
  return getCookie("loginUser");
}

export const setLoginUser = (user: string) => {
  setCookie("loginUser", user, 1);
};

export const removeLoginUser = () => {
  removeCookie("loginUser");
};
