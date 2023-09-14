import pathManager from 'path-kanri';

// Paths of pages
const {
  getPath: getWebRoute,
  getFullPath: getWebRouteFull,
} = pathManager({
  home: '/',
  signUp: '/signup',
  login: '/login',
  // TODO: add all page routes
});

export { getWebRoute, getWebRouteFull };
