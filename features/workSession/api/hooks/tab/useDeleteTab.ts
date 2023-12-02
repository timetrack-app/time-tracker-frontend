import { UseMutationOptions, useMutation } from 'react-query';
import { deleteTab } from '../../services/tab/deleteTab';
import { DeleteTabParams } from '../../../types';

/**
 * Custom hook for delete a work session
 *
 * @param {UseMutationOptions<void, DeleteTabParams, undefined>} [options]
 */
export const useDeleteTab = (
  options?: UseMutationOptions<void, DeleteTabParams, undefined>,
) =>
  useMutation((values: DeleteTabParams) => deleteTab(values), {
    ...options,
  });
