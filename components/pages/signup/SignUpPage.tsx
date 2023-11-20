import { SubmitHandler } from 'react-hook-form';

import { TextInput } from '../../elements/ReactHookForm';
import ButtonPrimary from '../../elements/common/Button/ButtonPrimary';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import {
  AuthForm,
  AuthFormContentsWrapper,
  useUserRegistration,
} from '../../../features/auth';

import { emailRegExp } from '../../../const/validation/rules/email';
import {
  emailRequiredMsg,
  emailInvalidMsg,
  passwordRequiredMsg,
  passwordConfirmationRequiredMsg,
  passwordConfirmationMismatchMsg,
} from '../../../const/validation/messages';

import { showToast } from '../../../libs/react-toastify/toast';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUpPage = () => {
  const { isLoading: isUserRegistrationLoading, mutate: registerUser } =
    useUserRegistration();

  // TODO: If the user logged in, redirect to main page
  // TODO: do this in the layout component

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({
    email,
    password,
  }) => {
    await registerUser(
      { email, password },
      {
        onError: () => {
          showToast('error', 'An error has occurred.');
        },
        onSuccess: () => {
          showToast('success', 'Verification email sent! Please check.');
        },
      },
    );
  };

  // TODO: emailVerification->ok->login

  // TODO: Set the same password validation as the backend

  return (
    <>
      <LoadingOverlay loading={isUserRegistrationLoading} />
      <AuthForm<SignUpFormValues> onSubmit={onSubmit}>
        {({ register, formState, getValues }) => (
          <AuthFormContentsWrapper
            button={
              <ButtonPrimary type="submit">
                <p>Sign Up</p>
              </ButtonPrimary>
            }
          >
            <TextInput
              type="text"
              placeholder="example@example.com"
              label="E-mail"
              registration={register('email', {
                required: emailRequiredMsg,
                pattern: {
                  value: emailRegExp,
                  message: emailInvalidMsg,
                },
              })}
              error={formState.errors.email}
            />

            <TextInput
              type="password"
              label="Password"
              registration={register('password', {
                required: passwordRequiredMsg,
              })}
              error={formState.errors.password}
            />

            <TextInput
              type="password"
              label="Confirm Password"
              registration={register('passwordConfirmation', {
                required: passwordConfirmationRequiredMsg,
                validate: (value) =>
                  value === getValues('password') ||
                  passwordConfirmationMismatchMsg,
              })}
              error={formState.errors.passwordConfirmation}
            />
          </AuthFormContentsWrapper>
        )}
      </AuthForm>
    </>
  );
};

export default SignUpPage;
