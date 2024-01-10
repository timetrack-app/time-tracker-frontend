// Types of available color themes
export const colorThemeNames = [
  'light',
  'dark',
] as const;

// Can't use type ColorThemeName because of circular dependency
export const defaultColorThemeName: typeof colorThemeNames[number] = 'light';

// Cookie key for color theme
export const colorThemeCookieName = 'timeTrackerColorTheme';
