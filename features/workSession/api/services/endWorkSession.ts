import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { EndWorkSessionParams } from '../../types';

/**
 *
 *
 * @param {EndWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const endWorkSession = async (
  { userId, workSessionId }: EndWorkSessionParams,
): Promise<void> => {
  const res = await axiosBase().put(getApiEndpoint('endWorkSession', { userId, workSessionId }));
  return res.data;
};
