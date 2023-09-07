import styled from 'styled-components';

import Form from '../components/Elements/ReactHookForm/Form';
import TextInput from '../components/Elements/ReactHookForm/TextInput';

// layout
const MainContainerDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
`;

const StyledForm = styled(Form)`
  width: 100%;
` as typeof Form;

const SubmitButtonWrapperDiv = styled.div`
  width: 15em;
  height: 3em;
`;

// TODO: children
const SubmitButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 48px;
`;

type LoginFormValues = {
  email: string
  password: string
};

const Login = () => {
  const onSubmit = () => {
    /* do something */
  };

  return (
    <MainContainerDiv>
      <StyledForm<LoginFormValues>
        onSubmit={onSubmit}
      >
        {({ register, formState }) => (
          <>
            <TextInput
              type="text"
              label="E-mail"
              registration={register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              })}
              error={formState.errors.email}
            />

            <TextInput
              type="text"
              label="Password"
              registration={register('password', {
                required: true,
              })}
              error={formState.errors.password}
            />

            <SubmitButtonWrapperDiv>
              <SubmitButton>
                <p>Login</p>
              </SubmitButton>
            </SubmitButtonWrapperDiv>
          </>
        )}
      </StyledForm>
    </MainContainerDiv>
  );
};

export default Login;
