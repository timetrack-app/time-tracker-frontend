import { UseMutationOptions, useMutation } from 'react-query';
import { updateList } from '../../services/list/updateList';
import { UpdateListParams, UpdateListResponse } from '../../../types';

/**
 * Custom hook for update a work session
 *
 * @param {UseMutationOptions<void, UpdateListParams, undefined>} [options]
 */
export const useUpdateList = (
  options?: UseMutationOptions<UpdateListResponse, UpdateListParams, undefined>,
) =>
  useMutation((values: UpdateListParams) => updateList(values), {
    ...options,
  });
