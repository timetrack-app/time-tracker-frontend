import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import {
  CreateWorkSessionParams,
  CreateWorkSessionResponse,
} from '../../types';

/**
 *
 *
 * @param {createWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const createWorkSession = async ({
  userId,
  tabs,
}: CreateWorkSessionParams): Promise<CreateWorkSessionResponse> => {
  const body = { tabs };
  const res = await axiosBase().post(
    getApiEndpointFull('createWorkSession', { userId }),
    body,
  );
  console.log('createWorkSession', res);
  return res.data;
};
