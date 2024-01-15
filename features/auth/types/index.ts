export type UserRegistrationRequest = {
  email: string
  password: string
  passwordConfirmation: string
};

export type UserLoginRequest = {
  email: string
  password: string
};

export type UserLoginResponse = {
  id: number
  email: string
  isVerified: boolean
  authToken: string
};

export type IsAuthenticatedResponse = {
  id: number
  email: string
  isVerified: boolean
};

export type EmailVerificationResponse = {
  token: string
};
