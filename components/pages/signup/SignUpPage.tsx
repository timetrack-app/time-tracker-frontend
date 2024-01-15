import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { TextInput } from '../../elements/ReactHookForm';
import ButtonPrimary from '../../elements/common/Button/ButtonPrimary';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import {
  AuthForm,
  AuthFormContentsWrapper,
  useUserRegistration,
  useIsAuthenticated,
} from '../../../features/auth';
import SignUpFailedToastContents from './SignUpFailedToastContents';
import SignUpCompletePage from './SignUpCompletePage';
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
import { getWebRoute } from '../../../routes/web';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { useAnyTrue } from '../../../hooks/useAnyTrue';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUpPage = () => {
  const router = useRouter();

  const authToken = getUserLoginCookie();
  const { isLoading: isAuthCheckLoading } = useIsAuthenticated(authToken, {
    onSuccess() {
      router.push(getWebRoute('home'));
    },
    onError() {
      // Do not remove this empty onError
      // If this is not here, session expired error toast will be shown
      // and that is not the expected behavior.
    },
  });

  const {
    isLoading: isUserRegistrationLoading,
    mutate: registerUser,
    isSuccess: isRegistrationSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (formValues) => {
    await registerUser(
      { ...formValues },
      {
        onError: () => {
          showToast('error', <SignUpFailedToastContents />);
        },
      },
    );
  };

  const isLoading = useAnyTrue([
    isAuthCheckLoading,
    isUserRegistrationLoading,
  ]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      {
        isRegistrationSuccess
          ? <SignUpCompletePage />
          : <AuthForm<SignUpFormValues> onSubmit={onSubmit}>
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
      }
    </>
  );
};

export default SignUpPage;
