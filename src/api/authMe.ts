import axiosInstance from '../utils/request';

export const authMe = async () => {
  if (!localStorage.getItem('accessToken')) {
    return null;
  }
  return axiosInstance.request({ method: 'get', url: '/users/me' });
};
