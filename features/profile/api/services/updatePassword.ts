import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { UpdatePasswordRequest } from '../../types';

/**
 * Call password update API
 *
 * @param {UpdatePasswordRequest} values
 * @return {Promise<void>}
 */
export const updatePassword = async (values: UpdatePasswordRequest): Promise<void> => {
  const res = await axiosBase(values.authToken).post(
    getApiEndpoint('updatePassword'),
    {
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    }
  );

  return res.data;
};
