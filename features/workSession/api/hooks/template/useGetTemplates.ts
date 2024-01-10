import { useQuery, UseQueryOptions } from 'react-query';
import { getTemplates } from '../../services/template/getTemplates';
import { GetTemplatesResponse } from '../../../types';

export const getTemplatesQueryKey = (
  authToken: string,
  page?: number,
  limit?: number,
) => {
  return ['get/templates', { authToken, page, limit }];
};

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
  page?: number,
  limit?: number,
  options?: UseQueryOptions<
    GetTemplatesResponse,
    unknown,
    GetTemplatesResponse
  >,
) => {
  return useQuery(
    getTemplatesQueryKey(authToken, page, limit),
    () => getTemplates(authToken, userId, page, limit),
    { ...options },
  );
};
