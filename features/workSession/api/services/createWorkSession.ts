import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { WorkSession } from '../../../../types/entity';
import { CreateWorkSessionParams } from '../../types';

/**
 *
 *
 * @param {createWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const createWorkSession = async ({
  userId,
  tabs,
}: CreateWorkSessionParams): Promise<WorkSession> => {
  const body = { tabs };
  console.log(
    'API Request URL:',
    getApiEndpointFull('createWorkSession', { userId }),
  );
  console.log('Request Body:', body);

  const res = await axiosBase().post(
    getApiEndpointFull('createWorkSession', { userId }),
    body,
  );
  return res.data;
};
