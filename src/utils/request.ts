import * as Sentry from '@sentry/nextjs';
import axios, { AxiosInstance } from 'axios';

import { refreshToken } from '@/api/refreshExpiredToken';
import { ACCESS_KEY } from '@/constants/local-storage';
import { globalSignOut } from '@/contexts/user-context/user-provider';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Sentry.captureException(error);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    Sentry.captureException(error);

    // Extract the original request from the error object
    const originalRequest = error.config;

    // Check if the error is due to an expired access token.
    if (
      error.response.status === 401 &&
      error.response.data.exceptionMessage === 'Unauthorized - Token expired'
    ) {
      const res = await refreshToken();
      // Check if the refresh was successful and we received a new access token.
      if (res?.status === 201 && res.data.accessToken) {
        const updatedAccessToken = res.data.accessToken;

        // Store the new token in local storage
        localStorage.setItem(ACCESS_KEY, updatedAccessToken);

        // Retry the original request
        return axiosInstance(originalRequest);
      } else {
        globalSignOut();
        return Promise.reject(error);
      }
    }

    // if refreshToken is expired, perform globalSignOut
    if (
      error.response.status === 401 &&
      error.response.data.exceptionMessage === 'Unauthorized - Refresh Token is expired'
    ) {
      globalSignOut();
      return Promise.reject(error);
    }

    // TODO: handle other status

    return Promise.reject(error);
  }
);

export default axiosInstance;
