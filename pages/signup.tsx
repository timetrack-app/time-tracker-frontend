import { SubmitHandler } from 'react-hook-form';

import TextInput from '../components/elements/ReactHookForm/TextInput';
import Button from '../components/elements/Button/Button';
import LoadingOverlay from '../components/elements/LoadingOverlay/LoadingOverlay';
import {
  AuthForm,
  AuthFormContentsWrapper,
  AuthFormLayout,
  useUserRegistration,
} from '../features/auth/index';

import { emailRegExp } from '../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
  passwordConfirmationRequired,
  passwordConfirmationMismatch,
} from '../const/validation/messages';

import { showToast } from '../libs/react-toastify/toast';

import { softPetals, vegetation } from '../const/styles/colors';

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
};

/**
 * User registration page
 *
 * @return {*} JSX.Element
 */
const SignUp = () => {
  const {
    isLoading: isUserRegistrationLoading,
    mutate: registerUser,
  } = useUserRegistration();

  // TODO: If the user logged in, redirect to main page
  // TODO: do this in the layout component

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({ email, password }) => {
    await registerUser({ email, password }, {
      onError: () => {
        showToast('error', 'An error has occurred.');
      },
      onSuccess: () => {
        showToast('success', 'Verification email sent! Please check.');
      },
    });
  };

  // TODO: emailVerification->ok->login

  // TODO: Set the same password validation as the backend

  return (
    <>
      <LoadingOverlay loading={isUserRegistrationLoading} />
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
    </>
  );
};

SignUp.getLayout = (page: React.ReactElement) => (
  <AuthFormLayout>{page}</AuthFormLayout>
);

export default SignUp;
