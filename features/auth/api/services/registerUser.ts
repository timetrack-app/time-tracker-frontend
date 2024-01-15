import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { UserRegistrationRequest } from '../../types';

/**
 * User registration API call
 *
 * @param {UserRegistrationRequest} values
 * @return {Promise<void>}
 */
export const registerUser = async (
  values: UserRegistrationRequest,
): Promise<void> => {
  const res = await axiosBase().post(getApiEndpoint('register'), values);

  return res.data;
};
