import { useMutation } from 'react-query';
import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { UserRegistrationRequest } from '../../types';

/**
 * User registration API call
 *
 * @param {UserRegistrationRequest} values
 * @return {*}  {Promise<void>}
 */
const registerUser = async (
  values: UserRegistrationRequest,
): Promise<void> => {
  const res = await axiosBase().post(getApiEndpointFull('register'), values);

  return res.data;
};

/**
 * Custom hook for user registration
 *
 */
export const useUserRegistration = () => (
  useMutation((values: UserRegistrationRequest) => registerUser(values))
);
