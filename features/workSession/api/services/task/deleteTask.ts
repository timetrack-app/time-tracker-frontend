import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { DeleteTaskParams } from '../../../types';

/**
 *
 *
 * @param {deleteTaskParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const deleteTask = async ({
  workSessionId,
  tabId,
  listId,
  taskId,
  authToken,
}: DeleteTaskParams): Promise<void> => {
  const res = await axiosBase(authToken).delete(
    getApiEndpointFull('deleteTask', { workSessionId, tabId, listId, taskId }),
  );
  return res.data;
};
