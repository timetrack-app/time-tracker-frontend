import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { DeleteListParams } from '../../../types';

/**
 *
 *
 * @param {deleteListParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const deleteList = async ({
  workSessionId,
  tabId,
  listId,
  authToken,
}: DeleteListParams): Promise<void> => {
  const res = await axiosBase(authToken).delete(
    getApiEndpointFull('deleteList', { workSessionId, tabId, listId }),
  );
  return res.data;
};
