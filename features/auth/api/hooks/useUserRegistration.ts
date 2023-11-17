import { UseMutationOptions, useMutation } from 'react-query';
import { registerUser } from '../services/registerUser';
import { UserRegistrationRequest } from '../../types';

/**
 * Custom hook for user registration
 *
 */
export const useUserRegistration = (
  options?: UseMutationOptions<void, unknown, UserRegistrationRequest, unknown>,
) => (
  useMutation((values: UserRegistrationRequest) => registerUser(values), { ...options })
);
