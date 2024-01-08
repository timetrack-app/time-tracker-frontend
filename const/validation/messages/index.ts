// Write everything in this file for now.
// If it gets too large then separate into multiple files.

import { passwordMinLen, passwordMaxLen } from '../rules/password';

// email
export const emailRequiredMsg = 'Email is required';
export const emailInvalidMsg = 'Please enter a valid email';

// password
export const invalidPasswordLengthMsg = `Password must be ${passwordMinLen}-${passwordMaxLen} characters`;
export const passwordRequiredMsg = 'Password is required.';

// password confirmation
export const passwordConfirmationMismatchMsg = 'Passwords do not match';
export const passwordConfirmationRequiredMsg =
  'Password confirmation is required';

// others
export const taskNameRequiredMsg = 'Task name is required';

export const tabRenameRequired = 'Tab name has to be at least 1 character long';

export const listRenameRequired =
  'List name has to be at least 1 character long';

export const taskRenameRequired =
  'Task name has to be at least 1 character long';
