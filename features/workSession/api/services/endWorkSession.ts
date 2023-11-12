import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { EndWorkSessionParams } from '../../types';

/**
 *
 *
 * @param {EndWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const endWorkSession = async ({
  userId,
  workSessionId,
}: EndWorkSessionParams): Promise<void> => {
  console.log('workSessionId', workSessionId);

  const res = await axiosBase().put(
    getApiEndpointFull('endWorkSession', { userId, workSessionId }),
  );
  return res.data;
};
