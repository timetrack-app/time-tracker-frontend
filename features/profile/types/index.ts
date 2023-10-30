export type GetUserResponse = {
  id: number
  email: string
  isVerified: boolean
};

export type UpdateEmailRequest = {
  authToken: string
  userId: number
  email: string
};

export type UpdatePasswordRequest = {
  authToken: string
  userId: number
  password: string
  passwordConfirmation: string
};
