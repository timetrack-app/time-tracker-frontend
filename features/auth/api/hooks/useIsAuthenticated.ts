import { useQuery, UseQueryOptions } from 'react-query';
import { isAuthenticated } from '../services/isAuthenticated';
import { IsAuthenticatedResponse } from '../../types';

/**
 * Custom hook for checking a user is logged in
 *
 * @param {string} authToken
 * @param {UseQueryOptions} [options]
 * @return {*}
 */
export const useIsAuthenticated = (
  authToken: string,
  options?: UseQueryOptions<IsAuthenticatedResponse, unknown, IsAuthenticatedResponse>,
) => {
  return useQuery<IsAuthenticatedResponse>(
    ['isAuthenticated', { authToken }],
    () => isAuthenticated(authToken),
    { ...options },
  );
};
