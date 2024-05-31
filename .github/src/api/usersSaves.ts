import axiosInstance from '../utils/request';

export const usersSaves = async (placeId: string, placeType: string) => {
  if (!localStorage.getItem('accessToken')) {
    return null;
  }
  return axiosInstance.request({
    method: 'post',
    url: '/users/me/saves',
    data: { placeId, placeType },
  });
};
