import pathManager from 'path-kanri';

import { apiBaseUrl } from '../const/api';

// Paths of pages
const {
  getPath: getApiEndpoint,
  getFullPath: getApiEndpointFull,
} = pathManager({
  register: '/register',
  login: '/login/{id}/{name}',
  logout: '/logout',
  endWorkSession: '/users/{userId}/work-sessions/{workSessionId}/end',
  getUser: '/users/{userId}',
  isAuthenticated: '/auth/is-authenticated',
  updateEmail: '/users/{userId}/email-update',
  updatePassword: '/users/{userId}/password-update',
  templates: '/users/{userId}/templates'
}, apiBaseUrl);

export { getApiEndpoint, getApiEndpointFull };
