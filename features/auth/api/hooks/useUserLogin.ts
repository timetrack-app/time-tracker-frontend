import { useMutation, UseMutationOptions } from 'react-query';
import { userLogin } from '../services/loginUser';
import { UserLoginRequest, UserLoginResponse } from '../../types';

/**
 * Custom hook form user login
 *
 */
export const useUserLogin = (
  options?: UseMutationOptions<UserLoginResponse, UserLoginRequest, undefined>,
) => (
  useMutation((values: UserLoginRequest) => userLogin(values), { ...options })
);
