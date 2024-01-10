import { UseMutationOptions, useMutation } from 'react-query';
import { createWorkSession } from '../../services/workSession/createWorkSession';
import {
  CreateWorkSessionParams,
  CreateWorkSessionResponse,
} from '../../../types';

/**
 * Custom hook for create a work session
 *
 * @param {UseMutationOptions<void, CreateWorkSessionParams, undefined>} [options]
 */
export const useCreateWorkSession = (
  options?: UseMutationOptions<
    CreateWorkSessionResponse,
    CreateWorkSessionParams,
    undefined
  >,
) =>
  useMutation((values: CreateWorkSessionParams) => createWorkSession(values), {
    ...options,
  });
