import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';

import TextInput from '../components/elements/ReactHookForm/TextInput';
import Button from '../components/elements/Button/Button';
import LoadingOverlay from '../components/elements/LoadingOverlay/LoadingOverlay';
import {
  AuthForm,
  AuthFormContentsWrapper,
  AuthFormLayout,
  useUserLogin,
} from '../features/auth/index';

import { emailRegExp } from '../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
} from '../const/validation/messages';

import { getWebRouteFull } from '../routes/web';
import { setUserLoginCookie } from '../utils/cookie/auth';
import { showToast } from '../libs/react-toastify/toast';

import { softPetals, vegetation } from '../const/styles/colors';

type LoginFormValues = {
  email: string
  password: string
};

/**
 * User login form
 *
 * @return {*} JSX.Element
 */
const Login = () => {
  const router = useRouter();

  const { isLoading: isUserLoginLoading, mutate: userLogin } = useUserLogin();

  // TODO: If the user logged in, redirect to main page

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    await userLogin({ email, password }, {
      onError: () => {
        showToast('error', 'An error has occurred.');
      },
      onSuccess: (res) => {
        setUserLoginCookie(res.token);
        router.push(getWebRouteFull('home'));
      },
    });
  };

  // TODO: Set the same password validation as the backend

  return (
    <>
      <LoadingOverlay loading={isUserLoginLoading} />
      <AuthForm<LoginFormValues>
        onSubmit={onSubmit}
      >
        {({ register, formState }) => (
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
          </AuthFormContentsWrapper>
        )}
      </AuthForm>
    </>
  );
};

Login.getLayout = (page: React.ReactElement) => (
  <AuthFormLayout>{page}</AuthFormLayout>
);

export default Login;
