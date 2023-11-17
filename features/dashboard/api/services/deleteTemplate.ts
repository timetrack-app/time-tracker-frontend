import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { DeleteTemplateRequest } from '../../types';

/**
 * Delete a template
 *
 * @param {DeleteTemplateRequest} {
 *   authToken,
 *   userId,
 *   templateId,
 * }
 * @return {*}  {Promise<void>}
 */
export const deleteTemplate = async ({
  authToken,
  userId,
  templateId,
}: DeleteTemplateRequest): Promise<void> => {
  const res = await axiosBase(authToken).delete(getApiEndpoint('template', { userId, templateId }));
  return res.data;
};
