import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { WorkSession } from '../../../../types/entity';
import { GetLatestWorkSessionParams } from '../../types';
import { getLatestWorkSession } from '../services/getLatestWorkSession';

/**
 * Custom hook for getting the latest work session
 *
 * @param {UseQueryOptions<WorkSession, Error, WorkSession, GetLatestWorkSessionParams>} [options]
 */
export const useGetLatestWorkSession = (
  query: GetLatestWorkSessionParams,
  options?: UseQueryOptions<WorkSession, AxiosError>,
) => {
  return useQuery<WorkSession>(
    ['latestWorkSession', query],
    () => getLatestWorkSession(query),
    options,
  );
};
