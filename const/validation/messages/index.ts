// Write everything in this file for now.
// If it gets too large then separate into multiple files.

import { passwordMinLen, passwordMaxLen } from '../rules/password';

export const emailRequired = 'Email is required';
export const emailInvalid = 'Please enter a valid email';

export const invalidPasswordLength = `Password must be ${passwordMinLen}-${passwordMaxLen} characters`;
// export const passwordNumber = 'Password must contain at least one number';
// export const passwordUppercase = 'Password must have at least one uppercase letter';
// export const passwordLowercase = 'Password must have at least one lowercase letter';
export const passwordRequired = 'Password is required.';

export const passwordConfirmationMismatch = 'Passwords do not match';
export const passwordConfirmationRequired = 'Password confirmation is required';
