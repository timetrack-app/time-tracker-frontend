import { useMutation } from 'react-query';
import { userLogin } from '../services/loginUser';
import { UserLoginRequest } from '../../types';

/**
 * Custom hook form user login
 *
 */
export const useUserLogin = () => (
  useMutation((values: UserLoginRequest) => userLogin(values))
);
