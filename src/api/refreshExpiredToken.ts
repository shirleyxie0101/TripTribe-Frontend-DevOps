import { REFRESH_KEY } from '@/constants/local-storage';
import axiosInstance from '@/utils/request';

export const refreshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) {
    return null;
  }
  return axiosInstance.request({
    method: 'post',
    url: '/auth/refreshToken',
    data: { refreshToken },
  });
};
