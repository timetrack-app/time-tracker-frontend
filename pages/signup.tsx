import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';

// components
import TextInput from '../components/elements/ReactHookForm/TextInput';
import Button from '../components/elements/Button/Button';
import { AuthForm, AuthFormContentsWrapper, AuthFormLayout } from '../features/auth/index';

// validations
import { emailRegExp } from '../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
  passwordConfirmationRequired,
  passwordConfirmationMismatch,
} from '../const/validation/messages';

// api
import { useUserRegistration } from '../features/auth/api/hooks/useUserRegistration';

// styles
import { softPetals, vegetation } from '../styles/colors';

import { getWebRouteFull } from '../routes/web';

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
};

const SignUp = () => {
  const router = useRouter();

  const {
    isLoading: isUserRegistrationLoading,
    mutate: registerUser,
  } = useUserRegistration();

  // TODO: If the user logged in, redirect to main page
  // TODO: do this in the layout component

  const onSubmit: SubmitHandler<SignUpFormValues> = async (
    { email, password }: SignUpFormValues,
  ) => {
    await registerUser({ email, password }, {
      onError: () => {
        /* TODO: do something */
      },
      onSuccess: (data) => {
        // data: UserRegistrationResponse
        // TODO: set token to cookie
        // TODO: redirect to the main page
        router.push(getWebRouteFull('home'));
      },
    });
  };

  // TODO: Set the same password validation as the backend

  return (
    <AuthForm<SignUpFormValues>
      onSubmit={onSubmit}
    >
      {({ register, formState, getValues }) => (
        <AuthFormContentsWrapper
          button={(
            <Button
              type="submit"
              color={vegetation}
              backgroundColor={softPetals}
              borderColor={vegetation}
            >
              <p>Login</p>
            </Button>
          )}
        >
          <TextInput
            type="text"
            placeholder="example@example.com"
            label="E-mail"
            registration={register('email', {
              required: emailRequired,
              pattern: {
                value: emailRegExp,
                message: emailInvalid,
              },
            })}
            error={formState.errors.email}
          />

          <TextInput
            type="password"
            label="Password"
            registration={register('password', {
              required: passwordRequired,
            })}
            error={formState.errors.password}
          />

          <TextInput
            type="password"
            label="Confirm Password"
            registration={register('passwordConfirmation', {
              required: passwordConfirmationRequired,
              validate: (value) => (value === getValues('password') || passwordConfirmationMismatch),
            })}
            error={formState.errors.passwordConfirmation}
          />
        </AuthFormContentsWrapper>
      )}
    </AuthForm>
  );
};

SignUp.getLayout = (page: React.ReactElement) => (
  <AuthFormLayout>{page}</AuthFormLayout>
);

export default SignUp;
