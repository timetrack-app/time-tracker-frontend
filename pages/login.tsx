import styled from 'styled-components';

import Form from '../components/Elements/ReactHookForm/Form';
import TextInput from '../components/Elements/ReactHookForm/TextInput';

import { emailRegExp } from '../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
} from '../const/validation/messages';

import { breakPoint } from '../styles/breakPoint';

// layout
const MainContainerDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 4em;
`;

// form elements
const StyledForm = styled(Form)`
  width: 100%;
` as typeof Form;

const FormMainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

  @media ${breakPoint.tablet} {
    max-width: 35em;
    margin: 0 auto;
  }
`;

const FormFieldsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

const StyledTextInput = styled(TextInput)`
` as typeof TextInput;

const SubmitButtonWrapperDiv = styled.div`
  width: 100%;
  height: 3em;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  color: ${({ theme }) => theme.colors.info};
  font-size: 1.3em;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.colors.info};
  background-color: ${({ theme }) => theme.colors.infoBg};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

type LoginFormValues = {
  email: string
  password: string
};

// TODO: use react query to call the login API
// TODO: create react query base function

const Login = () => {
  const onSubmit = () => {
    /* do something */
    // TODO: POST: login API
  };

  // TODO: Set the same password validation as the backend

  return (
    <MainContainerDiv>
      <StyledForm<LoginFormValues>
        onSubmit={onSubmit}
      >
        {({ register, formState }) => (
          <FormMainDiv>
            <FormFieldsDiv>

              <StyledTextInput
                type="text"
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

              <StyledTextInput
                type="password"
                label="Password"
                registration={register('password', {
                  required: passwordRequired,
                })}
                error={formState.errors.password}
              />

            </FormFieldsDiv>

            <SubmitButtonWrapperDiv>
              <SubmitButton type="submit">
                <p>Login</p>
              </SubmitButton>
            </SubmitButtonWrapperDiv>
          </FormMainDiv>
        )}
      </StyledForm>
    </MainContainerDiv>
  );
};

export default Login;
