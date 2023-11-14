import pathManager from 'path-kanri';

// Paths of pages
const {
  getPath: getWebRoute,
  getFullPath: getWebRouteFull,
} = pathManager({
  home: '/',
  signUp: '/signup',
  login: '/login',
  dashboard: '/dashboard',
  editEmail: '/dashboard/email',
  editPassword: '/dashboard/password',
  templateList: '/dashboard/templates',
  templateDetail: '/dashboard/templates/{templateId}',
  // TODO: add all page routes
});

export { getWebRoute, getWebRouteFull };
