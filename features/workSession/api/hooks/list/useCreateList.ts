import { UseMutationOptions, useMutation } from 'react-query';
import { createList } from '../../services/list/createList';
import { CreateListParams, CreateListResponse } from '../../../types';

/**
 * Custom hook for create a work session
 *
 * @param {UseMutationOptions<void, CreateListParams, undefined>} [options]
 */
export const useCreateList = (
  options?: UseMutationOptions<CreateListResponse, CreateListParams, undefined>,
) =>
  useMutation((values: CreateListParams) => createList(values), {
    ...options,
  });
