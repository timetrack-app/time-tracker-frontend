import { useQuery, UseQueryOptions } from 'react-query';
import { getTemplate } from '../services/getTemplate';
import { GetTemplateRequest, GetTemplateResponse } from '../../types';

/**
 *
 *
 * @param {GetTemplateRequest} getTemplateRequest
 * @param {UseQueryOptions<GetTemplateResponse, unknown, GetTemplateResponse>} [options]
 * @return {*}
 */
export const useGetTemplate = (
  getTemplateRequest: GetTemplateRequest,
  options?: UseQueryOptions<GetTemplateResponse, unknown, GetTemplateResponse>) => {
    return useQuery(
      ['template/get', getTemplateRequest],
      () => getTemplate(getTemplateRequest),
      { ...options },
    );
  }