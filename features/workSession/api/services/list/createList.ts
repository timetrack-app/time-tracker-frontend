import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { CreateListParams, CreateListResponse } from '../../../types';

/**
 *
 *
 * @param {createListParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const createList = async ({
  workSessionId,
  tabId,
  name,
  displayOrder,
  authToken,
}: CreateListParams): Promise<CreateListResponse> => {
  const body = { name, displayOrder };
  const res = await axiosBase(authToken).post(
    getApiEndpointFull('createList', { workSessionId, tabId }),
    body,
  );
  return res.data;
};
