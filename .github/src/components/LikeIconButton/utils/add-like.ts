import axiosInstance from '@/utils/request';

export const addLikePlace = async (id: string, type: string) => {
  const requestOptions = {
    url: '/users/me/saves',
    method: 'post',
    data: {
      placeId: id,
      placeType: type,
    },
  };
  await axiosInstance.request(requestOptions);
};
