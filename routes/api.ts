import pathManager from 'path-kanri';

import { apiBaseUrl } from '../const/api';

/* Users Endpoints */
const getUser = `/users/{userId}`;
const updateUserEmail = `/users/{userId}/email-update`;
const verifyUserNewEmail = `/users/email-update/verification`;
const updateUserPassword = `/users/{userId}/password-update`;
const sendPasswordChangeEmail = `/users/password-update/request`;
const verifyPasswordChangeToken = `/user/password-update/verification`;
// haven't implemented
const saveUserNewPassword = `/user/password-update/save`;
const getLoggedInUser = `/users/authenticated`;

/* Work Session Endpoints */
const createWorkSession = `/users/{userId}/work-sessions`;
const endWorkSession = `/users/{userId}/work-sessions/{workSessionId}/end`;
const getLatestWorkSession = `/users/{userId}/work-sessions/latest`;

/* Tab Endpoints */
const createTab = `/work-sessions/{workSessionId}/tabs`;
const updateTab = `/work-sessions/{workSessionId}/tabs/{tabId}`;
const deleteTab = `/work-sessions/{workSessionId}/tabs/{tabId}`;
/* List Endpoints */
const createList = `/work_sessions/{workSessionId}/tabs/{tabId}/lists`;
const updateList = `/work_sessions/{workSessionId}/tabs/{tabId}/lists/{listId}`;
const deleteList = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}`;

/* Task Endpoints */
const createTask = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}/tasks`;
const updateTask = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}/tasks/{taskId}`;
const deleteTask = `/work-sessions/{workSessionId}/tabs/{tabId}/lists/{listId}/tasks/{taskId}`;

/* Template Endpoints */
const createTemplate = `/users/{userId}/templates`;
const deleteTemplate = `/users/{userId}/templates/{templateId}`;

// Paths of pages
const { getPath: getApiEndpoint, getFullPath: getApiEndpointFull } =
  pathManager(
    {
      // auth
      register: 'auth/register',
      login: `auth/login/{id}/{name}`,
      logout: 'auth/logout',
      // users
      getUser,
      updateUserEmail,
      verifyUserNewEmail,
      updateUserPassword,
      sendPasswordChangeEmail,
      verifyPasswordChangeToken,
      saveUserNewPassword,
      getLoggedInUser,
      // workSession
      createWorkSession,
      endWorkSession,
      getLatestWorkSession,
      // tab
      createTab,
      updateTab,
      deleteTab,
      // list
      createList,
      updateList,
      deleteList,
      // task
      createTask,
      updateTask,
      deleteTask,
      // template
      createTemplate,
      deleteTemplate,
    },
    apiBaseUrl,
  );

export { getApiEndpoint, getApiEndpointFull };
