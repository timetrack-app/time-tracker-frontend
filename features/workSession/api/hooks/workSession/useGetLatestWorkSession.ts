import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  GetLatestWorkSessionParams,
  GetLatestWorkSessionResponse,
} from '../../../types';
import { getLatestWorkSession } from '../../services/workSession/getLatestWorkSession';

/**
 * Custom hook for getting the latest work session
 *
 * @param {UseQueryOptions<WorkSession, Error, WorkSession, GetLatestWorkSessionParams>} [options]
 */
export const useGetLatestWorkSession = (
  query: GetLatestWorkSessionParams,
  options?: UseQueryOptions<GetLatestWorkSessionResponse, AxiosError>,
) => {
  return useQuery<GetLatestWorkSessionResponse>(
    ['latestWorkSession', query],
    () => getLatestWorkSession(query),
    options,
  );
};
