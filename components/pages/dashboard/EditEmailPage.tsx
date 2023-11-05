import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { DashboardLayout }  from '../../../features/dashboard';
import ProfileForm from '../../../features/dashboard/components/elements/ProfileForm';
import { useIsAuthenticated } from '../../../features/auth/api/hooks/useIsAuthenticated';
import { useUpdateEmail } from '../../../features/profile';
import { TextInput } from '../../elements/ReactHookForm';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { MainContainer, ButtonWrapper, SubmitButton } from './styles/sharedStyles';
import { useAnyTrue } from '../../../hooks/useAnyTrue';
import { showToast } from '../../../libs/react-toastify/toast';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { emailRegExp } from '../../../const/validation/rules/email';
import { emailRequired, emailInvalid } from '../../../const/validation/messages';
import { getWebRoute } from '../../../routes/web';

type EmailEditFormValues = {
  email: string
};

const EditEmailPage = () => {
  // TODO: remove later
  const tmpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5OTEzMzI4MiwiZXhwIjoxNjk5MjE5NjgyfQ.I-TZIJRPqtxVex3jqa960CbvAywlSyzbPI4RYPXe1_4';

  const authToken = getUserLoginCookie();

  // const {
  //   data: user,
  //   isLoading: isCheckingAuth,
  //   isError: isAuthError,
  // } = useIsAuthenticated(authToken, {
  // });

  const {
    data: user,
    isLoading: isCheckingAuth,
    isError: isAuthError,
  } = useIsAuthenticated(tmpToken);

  const {
    isLoading: isUpdatingEmail,
    mutate: updateEmail
  } = useUpdateEmail();

  const submitHandler: SubmitHandler<EmailEditFormValues> = async ({ email }) => {
    await updateEmail(
      { authToken, userId: user.id, email, },
      {
        onError: () => {
          showToast('error', 'Failed to update your email address.');
        },
        onSuccess: () => {
          showToast('success', 'Verification sent! Please check your new email to confirm.')
        },
      }
    );
  };

  const isLoading = useAnyTrue([
    isCheckingAuth,
    isUpdatingEmail,
  ]);

  return (
    <DashboardLayout backButtonHref={getWebRoute('dashboard')}>
      <LoadingOverlay loading={isLoading} />
      <MainContainer>
        <h1>E-mail</h1>
        <ProfileForm<EmailEditFormValues>
          onSubmit={submitHandler}
          options={{
            defaultValues: {
              email: user?.email,
            },
            values: user,
          }}
        >
          {({ register, formState }) => (
            <>
              <div>
                <TextInput
                  type="text"
                  placeholder="example@example.com"
                  registration={register('email', {
                    required: emailRequired,
                    pattern: {
                      value: emailRegExp,
                      message: emailInvalid,
                    },
                  })}
                  error={formState.errors.email}
                />
              </div>
              <ButtonWrapper>
                <SubmitButton type='submit'>
                  Save
                </SubmitButton>
              </ButtonWrapper>
            </>
          )}
        </ProfileForm>
      </MainContainer>
    </DashboardLayout>
  );
};

export default EditEmailPage;
