import { useQuery, UseQueryOptions } from 'react-query';
import { getTemplates } from '../services/getTemplates';
import { GetTemplatesResponse } from '../../types';

/**
 * Custom hook for getting a list of template
 *
 * @param {string} authToken
 * @param {number} userId
 * @param {UseQueryOptions<GetTemplatesResponse, unknown, GetTemplatesResponse>} [options]
 * @return {*}
 */
export const useGetTemplates = (
  authToken: string,
  userId: number,
  options?: UseQueryOptions<GetTemplatesResponse, unknown, GetTemplatesResponse>
) => {
  return useQuery(
    ['get/templates', { authToken }],
    () => getTemplates(authToken, userId),
    { ...options },
  );
};
