import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { UserRegistrationRequest, UserRegistrationResponse } from '../../types';

/**
 * User registration API call
 *
 * @param {UserRegistrationRequest} values
 * @return {*}  {Promise<UserRegistrationResponse>}
 */
export const registerUser = async (
  values: UserRegistrationRequest,
): Promise<UserRegistrationResponse> => {
  const res = await axiosBase().post(getApiEndpointFull('register'), values);

  return res.data;
};
