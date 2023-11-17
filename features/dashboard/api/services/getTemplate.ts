import { axiosBase } from '../../../../libs/axios';
import { getApiEndpoint } from '../../../../routes/api';
import { GetTemplateRequest, GetTemplateResponse } from '../../types';

/**
 *
 *
 * @param {GetTemplateRequest} {
 *   authToken,
 *   userId,
 *   templateId,
 * }
 * @return {Promise<GetTemplateResponse>}
 */
export const getTemplate = async ({
  authToken,
  userId,
  templateId,
}: GetTemplateRequest): Promise<GetTemplateResponse> => {
  const res = await axiosBase(authToken).get(getApiEndpoint('template', { userId, templateId }));
  return res.data;
};
