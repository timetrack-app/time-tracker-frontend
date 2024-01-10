import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { TaskList } from '../../../../../types/entity';
import { UpdateListParams, UpdateListResponse } from '../../../types';

/**
 *
 *
 * @param {updateListParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const updateList = async ({
  workSessionId,
  tabId,
  listId,
  attr,
  authToken,
}: UpdateListParams): Promise<UpdateListResponse> => {
  const body: Partial<TaskList> = { ...attr };
  const res = await axiosBase(authToken).put(
    getApiEndpointFull('updateList', { workSessionId, tabId, listId }),
    body,
  );
  return res.data;
};
