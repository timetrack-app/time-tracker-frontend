import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { UpdateEmailRequest } from '../../types';

/**
 * Call user email update API
 *
 * @param {UpdateEmailRequest} values
 * @return {Promise<void>}
 */
export const updateEmail = async (values: UpdateEmailRequest): Promise<void> => {
  const res = await axiosBase(values.authToken)
    .post(
      getApiEndpoint('updateEmail', { userId: values.userId }),
      {
        email: values.email,
      }
    );

  return res.data;
};
