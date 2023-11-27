import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { DeleteTabParams } from '../../../types';

/**
 *
 *
 * @param {deleteTabParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const deleteTab = async ({
  workSessionId,
  tabId,
}: DeleteTabParams): Promise<void> => {
  const res = await axiosBase().delete(
    getApiEndpointFull('deleteTab', { workSessionId, tabId }),
  );
  return res.data;
};
