import { UseMutationOptions, useMutation } from 'react-query';
import { createTask } from '../../services/task/createTask';
import { CreateTaskParams, CreateTaskResponse } from '../../../types';

/**
 * Custom hook for create a task
 *
 * @param {UseMutationOptions<void, CreateTaskParams, undefined>} [options]
 */
export const useCreateTask = (
  options?: UseMutationOptions<CreateTaskResponse, CreateTaskParams, undefined>,
) =>
  useMutation((values: CreateTaskParams) => createTask(values), {
    ...options,
  });
