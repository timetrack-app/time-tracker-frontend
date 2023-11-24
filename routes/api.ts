// https://github.com/koyablue/path-kanri

import pathManager from 'path-kanri';

import { apiBaseUrl } from '../const/api';

// Paths of pages
const { getPath: getApiEndpoint, getFullPath: getApiEndpointFull } =
  pathManager(
    {
      register: '/auth/register',
      emailVerification: '/auth/email-verification',
      login: '/auth/login',
      logout: '/auth/logout',
      createWorkSession: '/users/{userId}/work-sessions',
      getLatestWorkSession: '/users/{userId}/work-sessions/latest',
      endWorkSession: '/users/{userId}/work-sessions/{workSessionId}/end',
      getUser: '/users/{userId}',
      isAuthenticated: '/auth/is-authenticated',
      updateEmail: '/users/{userId}/email-update',
      updatePassword: '/users/{userId}/password-update',
      templates: '/users/{userId}/templates',
      template: '/users/{userId}/templates/{templateId}',
    },
    apiBaseUrl,
  );

export { getApiEndpoint, getApiEndpointFull };
