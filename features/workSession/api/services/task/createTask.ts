import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { CreateTaskParams, CreateTaskResponse } from '../../../types';

/**
 *
 *
 * @param {createTaskParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const createTask = async ({
  workSessionId,
  listId,
  name,
  displayOrder,
  authToken,
}: CreateTaskParams): Promise<CreateTaskResponse> => {
  const body = { name, displayOrder };
  const res = await axiosBase(authToken).post(
    getApiEndpointFull('createTask', { workSessionId, listId }),
    body,
  );
  return res.data;
};
