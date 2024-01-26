import { axiosBase } from '../../../../../libs/axios';
import { getApiEndpointFull } from '../../../../../routes/api';
import {
  GetWorkSessionsByUserIdParams,
  GetWorkSessionsByUserIdResponse,
} from '../../../types';

/**
 * Get work sessions by user id
 * @param {GetWorkSessionsByUserIdParams} { authToken, userId }
 * @return {Promise<GetWorkSessionsByUserIdResponse>}  {workSessions}>
 */
export const getWorkSessionsByUserId = async ({
  authToken,
  userId,
}: GetWorkSessionsByUserIdParams): Promise<GetWorkSessionsByUserIdResponse> => {
  try {
    const res = await axiosBase(authToken).get(
      getApiEndpointFull('getWorkSessionsByUserId', { userId }),
    );
    return res.data;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error; // Re-throw the error for higher-level handling
  }
};
