// components
import TextInput from '../components/Elements/ReactHookForm/TextInput';
import AuthFormLayout from '../components/Layouts/AuthFormLayout';
import AuthFormContentsWrapper from '../components/Elements/AuthForm/AuthFormContentsWrapper';
import AuthForm from '../components/Elements/AuthForm/AuthForm';
import Button from '../components/Elements/Button/Button';

// validations
import { emailRegExp } from '../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
  passwordConfirmationRequired,
  passwordConfirmationMismatch,
} from '../const/validation/messages';

// styles
import { softPetals, vegetation } from '../styles/colors';

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
};

const SignUp = () => {
  // TODO: If the user logged in, redirect to main page

  const onSubmit = () => {
    /* do something */
    // TODO: POST: login API
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
