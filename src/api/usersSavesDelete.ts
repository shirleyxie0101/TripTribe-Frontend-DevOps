import axiosInstance from '../utils/request';

export const usersSavesDelete = async (placeId: string, placeType: string) => {
  if (!localStorage.getItem('accessToken')) {
    return null;
  }

  return axiosInstance.request({
    method: 'delete',
    url: `/users/me/saves/${placeType}/${placeId}`,
    params: {},
  });
};
