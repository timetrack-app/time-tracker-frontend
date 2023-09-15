import { useMutation } from 'react-query';
import { registerUser } from '../services/registerUser';
import { UserRegistrationRequest } from '../../types';

/**
 * Custom hook for user registration
 *
 */
export const useUserRegistration = () => (
  useMutation((values: UserRegistrationRequest) => registerUser(values))
);
