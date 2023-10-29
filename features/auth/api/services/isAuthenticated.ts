import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { IsAuthenticatedResponse } from '../../types';

/**
 * Check if a user is logged in
 *
 * @param {string} authToken
 * @return {Promise<IsAuthenticatedResponse>}
 */
export const isAuthenticated = async (authToken: string): Promise<IsAuthenticatedResponse> => {
  const res = await axiosBase(authToken).get(getApiEndpointFull('isAuthenticated'));

  return res.data;
};
