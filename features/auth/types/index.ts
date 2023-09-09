export type UserRegistrationRequest = {
  email: string
  password: string
};

export type UserRegistrationResponse = {
  id: number
  email: string
  token: string
};
