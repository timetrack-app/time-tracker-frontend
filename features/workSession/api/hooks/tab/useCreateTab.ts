import { UseMutationOptions, useMutation } from 'react-query';
import { createTab } from '../../services/tab/createTab';
import { CreateTabParams, CreateTabResponse } from '../../../types';

/**
 * Custom hook for create a work session
 *
 * @param {UseMutationOptions<void, CreateTabParams, undefined>} [options]
 */
export const useCreateTab = (
  options?: UseMutationOptions<CreateTabResponse, CreateTabParams, undefined>,
) =>
  useMutation((values: CreateTabParams) => createTab(values), {
    ...options,
  });
