import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { Task } from '../../../../../types/entity';
import { UpdateTaskParams, UpdateTaskResponse } from '../../../types';

/**
 *
 *
 * @param {updateTaskParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const updateTask = async ({
  workSessionId,
  tabId,
  listId,
  taskId,
  attr,
  authToken,
}: UpdateTaskParams): Promise<UpdateTaskResponse> => {
  const body: Partial<Task> = { ...attr };
  const res = await axiosBase(authToken).put(
    getApiEndpointFull('updateTask', { workSessionId, tabId, listId, taskId }),
    body,
  );
  return res.data;
};
