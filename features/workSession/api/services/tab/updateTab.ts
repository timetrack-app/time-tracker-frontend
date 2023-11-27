import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { Tab } from '../../../../../types/entity';
import { UpdateTabParams, UpdateTabResponse } from '../../../types';

/**
 *
 *
 * @param {updateTabParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const updateTab = async ({
  workSessionId,
  tabId,
  attr,
}: UpdateTabParams): Promise<UpdateTabResponse> => {
  const body: Partial<Tab> = { ...attr };
  const res = await axiosBase().put(
    getApiEndpointFull('updateTab', { workSessionId, tabId }),
    body,
  );
  return res.data;
};
