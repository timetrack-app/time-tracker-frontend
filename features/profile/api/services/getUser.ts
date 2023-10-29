import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { GetUserResponse } from '../../types';

/**
 * Get user data by id
 *
 * @param {string} authToken
 * @param {number} userId
 * @return {Promise<GetUserResponse>}
 */
export const getUser = async (authToken: string, userId: number): Promise<GetUserResponse> => {
  const res = await axiosBase(authToken).get(getApiEndpointFull('getUser', { userId }));
  return res.data;
};
