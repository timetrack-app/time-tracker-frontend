import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { TextInput } from '../../elements/ReactHookForm';
import ButtonPrimary from '../../elements/common/Button/ButtonPrimary';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import {
  AuthForm,
  AuthFormContentsWrapper,
  useUserLogin,
} from '../../../features/auth/index';

import { emailRegExp } from '../../../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
} from '../../../const/validation/messages';

import { getWebRouteFull } from '../../../routes/web';
import { setUserLoginCookie } from '../../../utils/cookie/auth';
import { showToast } from '../../../libs/react-toastify/toast';

type LoginFormValues = {
  email: string;
  password: string;
};

/**
 * User login form
 *
 * @return {*} JSX.Element
 */
const LoginPage = () => {
  const router = useRouter();

  const { isLoading: isUserLoginLoading, mutate: userLogin } = useUserLogin();

  // TODO: If the user logged in, redirect to main page

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    await userLogin(
      { email, password },
      {
        onError: () => {
          showToast('error', 'An error has occurred.');
        },
        onSuccess: (res) => {
          setUserLoginCookie(res.token);
          router.push(getWebRouteFull('home'));
        },
      },
    );
  };

  // TODO: Set the same password validation as the backend

  return (
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
          </AuthFormContentsWrapper>
        )}
      </AuthForm>
    </>
  );
};

export default LoginPage;
