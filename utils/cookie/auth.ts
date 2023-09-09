import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

import { userLoginCookieName } from '../../const/auth';

/**
 * Set user login token to cookie
 *
 * @param {string} token
 * @param {OptionsType} [options]
 */
export const setUserLoginCookie = (token: string, options?: OptionsType) => {
  setCookie(userLoginCookieName, token, options);
};

/**
 * Get user login token (or empty string) from cookie
 *
 * @param {OptionsType} [options]
 * @return {*}  {string}
 */
export const getUserLoginCookie = (options?: OptionsType): string => (
  getCookie(userLoginCookieName, options) || ''
);

/**
 * Remove user login token from cookie
 *
 * @param {OptionsType} [options]
 */
export const removeUserLoginCookie = (options?: OptionsType) => {
  deleteCookie(userLoginCookieName, options);
};
