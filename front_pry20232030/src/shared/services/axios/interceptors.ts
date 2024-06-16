/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "../../utils/token";
import { getValidationError } from "./errors";
import { apiService } from "./index";
import { ApiResponse } from "../../interfaces/apiResponse";

type RefreshTokenResponse = {
  accessToken: string;
};

const setTokenHeader = (request: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) request.headers["authorization"] = token;
};

export const axiosRequestInterceptor = (
  request: InternalAxiosRequestConfig
) => {
  if (request.url?.includes("auth")) return request;

  setTokenHeader(request);
  return request;
};

const handleTokenExpiration = () => {
  removeAccessToken();
  removeRefreshToken();
  window.location.href = "/login";
  // showInfoToast("Su sesión ha expirado");
  console.log("Su sesión ha expirado");
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    const response = await apiService.post<ApiResponse<RefreshTokenResponse>>(
      "/auth/refresh-token",
      {
        refreshToken,
      }
    );

    if (response.code !== 200) throw new Error("Error refreshing token");

    return response.body.accessToken;
  } catch (error) {
    handleTokenExpiration();
  }
};

const handleRefreshToken = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 498 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      if (accessToken) setAccessToken(accessToken);
      originalRequest.headers["authorization"] = accessToken;

      return axios(originalRequest);
    } catch (error) {
      handleTokenExpiration();
      return Promise.reject(error);
    }
  }
};

export const axiosResponseErrorHandler = async (error: any) => {
  if (error.response.status === 498) {
    handleRefreshToken(error);
  }

  if (error?.response?.data?.codeName)
    console.log(getValidationError(error.response.data.codeName));
  //showErrorToast(getValidationError(error.response.data.codeName));

  return Promise.reject(error);
};
