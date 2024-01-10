import { UseMutationOptions, useMutation } from 'react-query';
import { deleteTask } from '../../services/task/deleteTask';
import { DeleteTaskParams } from '../../../types';

/**
 * Custom hook for delete a task
 *
 * @param {UseMutationOptions<void, DeleteTaskParams, undefined>} [options]
 */
export const useDeleteTask = (
  options?: UseMutationOptions<void, DeleteTaskParams, undefined>,
) =>
  useMutation((values: DeleteTaskParams) => deleteTask(values), {
    ...options,
  });
