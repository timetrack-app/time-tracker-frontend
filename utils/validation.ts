import { passwordMinLen, passwordMaxLen } from '../const/validation/rules/password';

/**
 * Check if the length of password is valid
 *
 * @param {string} password
 * @return {boolean}
 */
export const isValidLengthPassword = (password: string): boolean => (
  passwordMinLen <= password.length && password.length <= passwordMaxLen
);
