import axios, { AxiosInstance } from 'axios';

import { apiBaseUrl } from '../const/api';

/**
 * Base axios instance for API calls
 *
 * @param {string} token
 * @return {*}  {AxiosInstance}
 */
export const axiosBase = (token: string = ''): AxiosInstance => {
  const bearerConfig = token ? `Bearer ${token}` : '';

  return axios.create({
    baseURL: apiBaseUrl,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: bearerConfig,
    },
  });
};
