import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import { CreateTabParams, CreateTabResponse } from '../../../types';

/**
 *
 *
 * @param {createTabParams} { workSessionId, name, displayOrder}
 * @return {*}  {Promise<void>}
 */
export const createTab = async ({
  workSessionId,
  name,
  displayOrder,
  authToken,
}: CreateTabParams): Promise<CreateTabResponse> => {
  const body = { name, displayOrder };
  const res = await axiosBase(authToken).post(
    getApiEndpointFull('createTab', { workSessionId }),
    body,
  );
  return res.data;
};
