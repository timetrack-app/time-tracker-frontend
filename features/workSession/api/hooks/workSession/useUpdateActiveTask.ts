import { UseMutationOptions, useMutation } from 'react-query';
import { updateActiveTask } from '../../services/workSession/updateActiveTask';
import { UpdateActiveTaskParams } from '../../../types';

/**
 * Custom hook for end a work session
 *
 * @param {UseMutationOptions<void, UpdateActiveTaskParams, undefined>} [options]
 */
export const useUpdateActiveTask = (
  options?: UseMutationOptions<void, UpdateActiveTaskParams, undefined>,
) =>
  useMutation((values: UpdateActiveTaskParams) => updateActiveTask(values), {
    ...options,
  });
