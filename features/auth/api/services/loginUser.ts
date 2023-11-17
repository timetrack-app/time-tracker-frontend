import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { UserLoginRequest, UserLoginResponse } from '../../types';

/**
 * User login API call
 *
 * @param {UserLoginRequest} values
 * @return {*}  {Promise<UserLoginResponse>}
 */
export const userLogin = async (values: UserLoginRequest): Promise<UserLoginResponse> => {
  const res = await axiosBase().post(getApiEndpoint('login'), values);

  return res.data;
};
