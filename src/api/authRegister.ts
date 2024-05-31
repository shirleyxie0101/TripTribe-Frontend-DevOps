import axiosInstance from '../utils/request';

export const authRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) =>
  axiosInstance.request({
    method: 'post',
    url: '/auth/register',
    data: { firstName, lastName, email, password },
  });
