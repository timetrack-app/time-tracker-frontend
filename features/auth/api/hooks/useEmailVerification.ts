import { useQuery, UseQueryOptions } from 'react-query';
import { verifyEmail } from '../services/verifyEmail';
import { EmailVerificationResponse } from '../../types';

/**
 * Custom hook form email verification
 *
 * @param {string} [token='']
 * @param {UseQueryOptions<EmailVerificationResponse, unknown, EmailVerificationResponse>} [options]
 * @return {*}
 */
export const useEmailVerification = (
  token = '',
  options?: UseQueryOptions<EmailVerificationResponse, unknown, EmailVerificationResponse>
) => {
  return useQuery<EmailVerificationResponse>(
    ['emailVerification/get', token],
    () => verifyEmail(token),
    { ...options },
  );
};
