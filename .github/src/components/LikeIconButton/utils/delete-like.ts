import axiosInstance from '@/utils/request';

export const deleteLikedPlace = async (id: string, type: string) => {
  console.log('delete');
  const requestOptions = {
    url: `/users/me/saves/${type}/${id}`,
    method: 'delete',
  };
  await axiosInstance.request(requestOptions);
};
