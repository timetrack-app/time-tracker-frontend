import { useQuery, UseQueryOptions } from 'react-query';
import { isAuthenticated } from '../services/isAuthenticated';

/**
 * Custom hook for checking a user is logged in
 *
 * @param {string} authToken
 * @param {UseQueryOptions} [options]
 * @return {*}
 */
export const useIsAuthenticated = (authToken: string, options?: UseQueryOptions) => {
  return useQuery(
    ['isAuthenticated', { authToken }],
    () => isAuthenticated(authToken),
    { ...options },
  );
};
