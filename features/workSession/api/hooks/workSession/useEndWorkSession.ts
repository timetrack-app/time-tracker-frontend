import { UseMutationOptions, useMutation } from 'react-query';
import { endWorkSession } from '../../services/workSession/endWorkSession';
import { EndWorkSessionParams } from '../../../types';

/**
 * Custom hook for end a work session
 *
 * @param {UseMutationOptions<void, EndWorkSessionParams, undefined>} [options]
 */
export const useEndWorkSession = (
  options?: UseMutationOptions<void, EndWorkSessionParams, undefined>,
) =>
  useMutation((values: EndWorkSessionParams) => endWorkSession(values), {
    ...options,
  });
