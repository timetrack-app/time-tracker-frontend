import { axiosBase } from '../../../../libs/axios';
import { getApiEndpointFull } from '../../../../routes/api';
import {
  GetLatestWorkSessionParams,
  GetLatestWorkSessionResponse,
} from '../../types';

/**
 *
 *
 * @param {createWorkSessionParams} { userId, workSessionId }
 * @return {*}  {Promise<void>}
 */
export const getLatestWorkSession = async ({
  authToken,
  userId,
}: GetLatestWorkSessionParams): Promise<GetLatestWorkSessionResponse> => {
  try {
    const res = await axiosBase(authToken).get(
      getApiEndpointFull('getLatestWorkSession', { userId }),
    );
    return res.data;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error; // Re-throw the error for higher-level handling
  }
};
