import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { TextInput } from '../../elements/ReactHookForm';
import ButtonPrimary from '../../elements/common/Button/ButtonPrimary';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { AuthForm, AuthFormContentsWrapper, useUserLogin } from '../../../features/auth/index';

import { emailRegExp } from '../../../const/validation/rules/email';
import {
  emailRequiredMsg,
  emailInvalidMsg,
  passwordRequiredMsg,
  invalidPasswordLengthMsg,
} from '../../../const/validation/messages';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { login, selectLoggedInUser } from '../../../stores/slices/authSlice';

import { getWebRouteFull } from '../../../routes/web';
import { setUserLoginCookie } from '../../../utils/cookie/auth';
import { showToast } from '../../../libs/react-toastify/toast';
import { isValidLengthPassword } from '../../../utils/validation';

type LoginFormValues = {
  email: string;
  password: string;
};

/**
 * User login form
 *
 * @return {JSX.Element}
 */
const LoginPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectLoggedInUser);

  const { isLoading: isUserLoginLoading, mutate: userLogin } = useUserLogin();

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    await userLogin(
      { email, password },
      {
        onError: () => {
          showToast(
            'error',
            <>
              Login failed.
              <br />
              Please check details and try again.
            </>
          );
        },
        onSuccess: (res) => {
          const { id, email, isVerified, authToken } = res;
          // set auth token to cookie, set user info to global state, then redirect to home
          setUserLoginCookie(authToken);
          dispatch(login({ id, email, isVerified }));
          router.push(getWebRouteFull('home'));
        },
      },
    );
  };

  // redirect to home page if the user is already logged in
  if (user) {
    router.push(getWebRouteFull('home'));
  }

  return (
    <>
      {
        user
          ? (
              <>
                <LoadingOverlay loading={isUserLoginLoading} />
                <AuthForm<LoginFormValues> onSubmit={onSubmit}>
                  {({ register, formState }) => (
                    <AuthFormContentsWrapper
                      button={
                        <ButtonPrimary type="submit">
                          <p>Login</p>
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
                    </AuthFormContentsWrapper>
                  )}
                </AuthForm>
              </>
            )
            : <></>
      }
    </>
  );
};

export default LoginPage;
