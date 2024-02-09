import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  GetWorkSessionsByUserIdParams,
  GetWorkSessionsByUserIdResponse,
} from '../../../types';
import { getWorkSessionsByUserId } from '../../services/workSession/getWorkSessionsByUserId';

/**
 *
 * @param {GetWorkSessionsByUserIdParams}
 * @param {UseQueryOptions<GetWorkSessionsByUserIdResponse, AxiosError>}
 * @returns {UseQueryResult<GetWorkSessionsByUserIdResponse, AxiosError>}
 */
export const useGetWorkSessionsByUserId = (
  query: GetWorkSessionsByUserIdParams,
  options?: UseQueryOptions<GetWorkSessionsByUserIdResponse, AxiosError>,
) => {
  return useQuery<GetWorkSessionsByUserIdResponse>(
    ['WorkSessionsByUserId', query],
    () => getWorkSessionsByUserId(query),
    options,
  );
};
