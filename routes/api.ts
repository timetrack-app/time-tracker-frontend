import pathManager from 'path-kanri';

import { apiBaseUrl } from '../const/api';

// Paths of pages
const {
  getPath: getApiEndpoint,
  getFullPath: getApiEndpointFull,
} = pathManager({
  register: '/register',
  login: `${apiBaseUrl}/login/{id}/{name}`,
  logout: '/logout',
  // TODO: add all endpoints
}, apiBaseUrl);

export { getApiEndpoint, getApiEndpointFull };
