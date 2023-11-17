import pathManager from 'path-kanri';

import { apiBaseUrl } from '../const/api';

// /* Auth Endpoints */
// const register = 'auth/register';
// const login = `auth/login/{id}/{name}`;
// const logout = 'auth/logout';

// /* Users Endpoints */
// const getUser = `/users/{userId}`;
// const updateUserEmail = `/users/{userId}/email-update`;
// const verifyUserNewEmail = `/users/email-update/verification`;
// const updateUserPassword = `/users/{userId}/password-update`;
// const sendPasswordChangeEmail = `/users/password-update/request`;
// const verifyPasswordChangeToken = `/user/password-update/verification`;
// // haven't implemented the server side
// const saveUserNewPassword = `/user/password-update/save`;
// const getLoggedInUser = `/users/authenticated`;

// /* Work Session Endpoints */
// const createWorkSession = `/users/{userId}/work-sessions`;
// const endWorkSession = `/users/{userId}/work-sessions/{workSessionId}/end`;
// const getLatestWorkSession = `/users/{userId}/work-sessions/latest`;

// /* Tab Endpoints */
// const createTab = `/work-sessions/{workSessionId}/tabs`;
// const updateTab = `/work-sessions/{workSessionId}/tabs/{tabId}`;
// const deleteTab = `/work-sessions/{workSessionId}/tabs/{tabId}`;
// /* List Endpoints */
// const createList = `/work_sessions/{workSessionId}/tabs/{tabId}/lists`;
// const updateList = `/work_sessions/{workSessionId}/tabs/{tabId}/lists/{listId}`;
// const deleteList = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}`;

// /* Task Endpoints */
// const createTask = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}/tasks`;
// const updateTask = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}/tasks/{taskId}`;
// const deleteTask = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}/tasks/{taskId}`;

// /* Template Endpoints */
// const createTemplate = `/users/{userId}/templates`;
// const deleteTemplate = `/users/{userId}/templates/{templateId}`;

// Paths of pages
const { getPath: getApiEndpoint, getFullPath: getApiEndpointFull } =
  pathManager(
    {
      register: '/auth/register',
      login: '/auth/login',
      logout: '/auth/logout',
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
