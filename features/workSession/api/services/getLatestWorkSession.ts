import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import { WorkSession } from '../../../../types/entity';
import { GetLatestWorkSessionParams } from '../../types';

/**
 *
 *
 * @param {createWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const getLatestWorkSession = async ({
  userId,
}: GetLatestWorkSessionParams): Promise<WorkSession> => {
  console.log('getLatestWorkSession', userId);

  try {
    const res = await axiosBase().get(
      getApiEndpointFull('getLatestWorkSession', { userId }),
    );
    console.log('Response received');
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error; // Re-throw the error for higher-level handling
  }
};
