// https://github.com/koyablue/path-kanri

import pathManager from 'path-kanri';

import { apiBaseUrl } from '../const/api';

// Paths of pages
const { getPath: getApiEndpoint, getFullPath: getApiEndpointFull } =
  pathManager(
    {
      // auth related
      register: '/auth/register',
      emailVerification: '/auth/email-verification',
      login: '/auth/login',
      logout: '/auth/logout',
      isAuthenticated: '/auth/is-authenticated',
      // workSession related
      createWorkSession: '/users/{userId}/work-sessions',
      getLatestWorkSession: '/users/{userId}/work-sessions/latest',
      endWorkSession: '/users/{userId}/work-sessions/{workSessionId}/end',
      // user related
      getUser: '/users/{userId}',
      updateEmail: '/users/{userId}/email-update',
      updatePassword: '/users/{userId}/password-update',
      templates: '/users/{userId}/templates',
      template: '/users/{userId}/templates/{templateId}',
      // tab related
      createTab: '/work-sessions/{workSessionId}/tabs',
      updateTab: '/work-sessions/{workSessionId}/tabs/{tabId}',
      deleteTab: '/work-sessions/{workSessionId}/tabs/{tabId}',

      // list related
      createList: '/work-sessions/{workSessionId}/{tabId}/lists',
      updateList: '/work-sessions/{workSessionId}/{tabId}/lists/{listId}',
      deleteList: '/work-sessions/{workSessionId}/{tabId}/lists/{listId}',
    },
    apiBaseUrl,
  );

export { getApiEndpoint, getApiEndpointFull };
