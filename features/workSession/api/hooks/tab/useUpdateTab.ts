import { UseMutationOptions, useMutation } from 'react-query';
import { updateTab } from '../../services/tab/updateTab';
import { UpdateTabParams, UpdateTabResponse } from '../../../types';

/**
 * Custom hook for update a work session
 *
 * @param {UseMutationOptions<void, UpdateTabParams, undefined>} [options]
 */
export const useUpdateTab = (
  options?: UseMutationOptions<UpdateTabResponse, UpdateTabParams, undefined>,
) =>
  useMutation((values: UpdateTabParams) => updateTab(values), {
    ...options,
  });
