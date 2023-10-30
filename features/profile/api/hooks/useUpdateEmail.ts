import { UseMutationOptions, useMutation } from 'react-query';
import { updateEmail } from '../services/updateEmail';
import { UpdateEmailRequest } from '../../types';

export const useUpdateEmail = (options?: UseMutationOptions<void, unknown, UpdateEmailRequest, unknown>) => (
  useMutation((values: UpdateEmailRequest) => updateEmail(values), { ...options })
);
