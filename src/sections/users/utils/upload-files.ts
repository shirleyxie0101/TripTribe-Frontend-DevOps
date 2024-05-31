import axiosInstance from '../../../utils/request';

export const uploadFiles = async (data: File, userId: string) => {
  const formData = new FormData();

  formData.append('avatar', data);

  const config = {
    method: 'put',
    url: `/users/${userId}`,
    data: formData,
  };
  try {
    await axiosInstance.request(config);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
