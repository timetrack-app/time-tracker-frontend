import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';

import { TextInput } from '../../elements/ReactHookForm';
import ButtonPrimary from '../../elements/common/Button/ButtonPrimary';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import {
  AuthForm,
  AuthFormContentsWrapper,
  useUserRegistration,
} from '../../../features/auth';
import SignUpFailedToastContents from './SignUpFailedToastContents';

import { emailRegExp } from '../../../const/validation/rules/email';
import {
  emailRequiredMsg,
  emailInvalidMsg,
  passwordRequiredMsg,
  passwordConfirmationRequiredMsg,
  passwordConfirmationMismatchMsg,
  invalidPasswordLengthMsg,
} from '../../../const/validation/messages';

import { showToast } from '../../../libs/react-toastify/toast';
import { isValidLengthPassword } from '../../../utils/validation';
import { useAppSelector } from '../../../stores/hooks';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';
import { getWebRoute } from '../../../routes/web';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUpPage = () => {
  const router = useRouter();

  const user = useAppSelector(selectLoggedInUser);

  if (user) {
    router.push(getWebRoute('home'));
  }

  const { isLoading: isUserRegistrationLoading, mutate: registerUser } =
    useUserRegistration();

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({
    email,
    password,
  }) => {
    await registerUser(
      { email, password },
      {
        onError: () => {
          showToast('error', <SignUpFailedToastContents />);
        },
        onSuccess: () => {
          showToast('success', 'Verification email sent! Please check your inbox.');
        },
      },
    );
  };

  // TODO: emailVerification->ok->login
  // TODO: send email complete page(now toast but not good)
  // TODO: email verification page(You have verified your email, Home button)(call verify API then login and redirect, need UI for failure)

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
                validate: (val: string) => {
                  if (!isValidLengthPassword(val)) return invalidPasswordLengthMsg;
                },
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
