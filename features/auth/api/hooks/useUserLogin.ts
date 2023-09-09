import { useMutation } from 'react-query';
import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { UserLoginRequest, UserLoginResponse } from '../../types';

/**
 * User login API call
 *
 * @param {UserLoginRequest} values
 * @return {*}  {Promise<UserLoginResponse>}
 */
const userLogin = async (values: UserLoginRequest): Promise<UserLoginResponse> => {
  const res = await axiosBase().post(getApiEndpointFull('login'), values);

  return res.data;
};

/**
 * Custom hook form user login
 *
 */
export const useUserLogin = () => (
  useMutation((values: UserLoginRequest) => userLogin(values))
);
