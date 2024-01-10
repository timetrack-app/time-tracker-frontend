import { useQuery, UseQueryOptions } from 'react-query'
import { getUser } from '../services/getUser'

/**
 * Custom hook for fetching user data
 *
 * @param {string} authToken
 * @param {number} userId
 * @param {UseQueryOptions} [options]
 * @return {*}
 */
export const useGetUser = (authToken: string, userId: number, options?: UseQueryOptions) => {
  return useQuery(
    ['user/get', { authToken }],
    () => getUser(authToken, userId),
    { ...options },
  );
};
