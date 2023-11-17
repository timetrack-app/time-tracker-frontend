import { useMutation, UseMutationOptions } from 'react-query';
import { deleteTemplate } from '../services/deleteTemplate';
import { DeleteTemplateRequest } from '../../types';

/**
 *
 *
 * @param {UseMutationOptions<void, unknown, DeleteTemplateRequest, unknown>} [options]
 */
export const useDeleteTemplate = (options?: UseMutationOptions<void, unknown, DeleteTemplateRequest, unknown>) => (
  useMutation((values: DeleteTemplateRequest) => deleteTemplate(values), { ...options })
);
