import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpoint } from '../../../../../routes/api';
import { GetTemplatesResponse } from '../../../types';

/**
 * Get a list of template
 *
 * @param {string} authToken
 * @param {number} userId
 * @return {Promise<GetTemplatesResponse>}
 */
export const getTemplates = async (
  authToken: string,
  userId: number,
  page?: number,
  limit?: number,
): Promise<GetTemplatesResponse> => {
  const res = await axiosBase(authToken).get(
    getApiEndpoint(
      'templates',
      { userId },
      { page: String(page), limit: String(limit) },
    ),
  );

  return res.data;
};
