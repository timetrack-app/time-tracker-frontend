import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { UserRegistrationRequest } from '../../types';

/**
 * User registration API call
 *
 * @param {UserRegistrationRequest} values
 * @return {*}  {Promise<void>}
 */
export const registerUser = async (
  values: UserRegistrationRequest,
): Promise<void> => {
  const res = await axiosBase().post(getApiEndpointFull('register'), values);

  return res.data;
};
