export type UserRegistrationRequest = {
  email: string
  password: string
};

// export type UserRegistrationResponse = {
//   id: number
//   email: string
//   token: string
// };

export type UserLoginRequest = {
  email: string
  password: string
};

export type UserLoginResponse = {
  token: string
};
