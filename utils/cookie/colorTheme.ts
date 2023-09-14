import { getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

import { colorThemeCookieName } from '../../const/colorTheme';

import { ColorThemeName, isColorThemeName } from '../../types/colorTheme';

/**
 * Set color theme cookie to persist color theme config
 *
 * @param {ColorThemeName} value
 * @param {OptionsType} [options]
 */
export const setColorThemeCookie = (value: ColorThemeName, options?: OptionsType) => {
  setCookie(colorThemeCookieName, value, options);
};

/**
 *
 *
 * @param {OptionsType} [options]
 * @return {string}  {string}
 */
export const getColorThemeCookie = (options?: OptionsType): string => {
  const colorThemeCookie = getCookie(colorThemeCookieName, options);
  return isColorThemeName(colorThemeCookie) ? colorThemeCookie : '';
};
