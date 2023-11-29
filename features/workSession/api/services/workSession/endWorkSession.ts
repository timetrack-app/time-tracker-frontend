import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { EndWorkSessionParams } from '../../../types';

/**
 *
 *
 * @param {EndWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const endWorkSession = async ({
  authToken,
  userId,
  workSessionId,
}: EndWorkSessionParams): Promise<void> => {
  const res = await axiosBase(authToken).put(
    getApiEndpointFull('endWorkSession', { userId, workSessionId }),
  );
  return res.data;
};
