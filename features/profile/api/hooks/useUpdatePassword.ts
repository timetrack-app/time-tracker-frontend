import { UseMutationOptions, useMutation } from 'react-query';
import { UpdatePasswordRequest } from '../../types';
import { updatePassword } from '../services/updatePassword';

export const useUpdatePassword = (options?: UseMutationOptions<void, unknown, UpdatePasswordRequest, unknown>) => (
  useMutation((values: UpdatePasswordRequest) => updatePassword(values), { ...options })
);
