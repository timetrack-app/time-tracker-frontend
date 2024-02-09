import { UseMutationOptions, useMutation } from 'react-query';
import { switchActiveTask } from '../../services/workSession/switchActiveTask';
import { UpdateActiveTaskParams } from '../../../types';

/**
 * Custom hook for switching active task
 *
 * @param {UseMutationOptions<void, UpdateActiveTaskParams, undefined>} [options]
 */
export const useSwitchActiveTask = (
  options?: UseMutationOptions<void, UpdateActiveTaskParams, undefined>,
) =>
  useMutation((values: UpdateActiveTaskParams) => switchActiveTask(values), {
    ...options,
  });
