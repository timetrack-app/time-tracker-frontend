import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { EmailVerificationResponse } from '../../types/index';

/**
 *
 *
 * @param {string} token
 * @return {Promise<EmailVerificationResponse>}
 */
export const verifyEmail = async (token: string): Promise<EmailVerificationResponse> => {
  const res = await axiosBase().get(`${getApiEndpoint('emailVerification')}?token=${token}`);
  return res.data;
};
