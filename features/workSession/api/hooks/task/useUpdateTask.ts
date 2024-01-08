import { UseMutationOptions, useMutation } from 'react-query';
import { updateTask } from '../../services/task/updateTask';
import { UpdateTaskParams, UpdateTaskResponse } from '../../../types';

/**
 * Custom hook for update a work session
 *
 * @param {UseMutationOptions<void, UpdateTaskParams, undefined>} [options]
 */
export const useUpdateTask = (
  options?: UseMutationOptions<UpdateTaskResponse, UpdateTaskParams, undefined>,
) =>
  useMutation((values: UpdateTaskParams) => updateTask(values), {
    ...options,
  });
