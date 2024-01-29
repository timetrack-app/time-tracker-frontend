import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { UpdateActiveTaskParams } from '../../../types';

/**
 *
 *
 * @param {UpdateActiveTaskParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const switchActiveTask = async ({
  authToken,
  userId,
  workSessionId,
  activeTabId,
  activeListId,
  activeTaskId,
}: UpdateActiveTaskParams): Promise<void> => {
  const body = { activeTabId, activeListId, activeTaskId };
  const res = await axiosBase(authToken).put(
    getApiEndpointFull('updateActiveTask', {
      userId,
      workSessionId,
    }),
    body,
  );
  return res.data;
};
