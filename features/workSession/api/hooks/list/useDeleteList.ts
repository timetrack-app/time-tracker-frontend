import { UseMutationOptions, useMutation } from 'react-query';
import { deleteList } from '../../services/list/deleteList';
import { DeleteListParams } from '../../../types';

/**
 * Custom hook for delete a work session
 *
 * @param {UseMutationOptions<void, DeleteListParams, undefined>} [options]
 */
export const useDeleteList = (
  options?: UseMutationOptions<void, DeleteListParams, undefined>,
) =>
  useMutation((values: DeleteListParams) => deleteList(values), {
    ...options,
  });
