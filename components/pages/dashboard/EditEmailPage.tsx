import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { DashboardLayout }  from '../../../features/dashboard';
import ProfileForm from '../../../features/dashboard/components/elements/ProfileForm';
import { useIsAuthenticated } from '../../../features/auth/api/hooks/useIsAuthenticated';
import { useUpdateEmail } from '../../../features/profile/api/hooks/useUpdateEmail';
import { TextInput } from '../../elements/ReactHookForm';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import ButtonPrimary from '../../elements/common/Button/ButtonPrimary';
import { useAnyTrue } from '../../../hooks/useAnyTrue';
import { showToast } from '../../../libs/react-toastify/toast';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { emailRegExp } from '../../../const/validation/rules/email';
import { emailRequired, emailInvalid } from '../../../const/validation/messages';
import { getWebRoute } from '../../../routes/web';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5em;
  padding: 0 1.5em;
`;

const Title = styled.h1`
`;

const FormContainer = styled.div`
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height:2em;
`;

const SubmitButton = styled(ButtonPrimary)`
  width: 15%;
  padding: 0.75em;
`;

type ProfileEditFormValues = {
  email: string
};

const EditEmailPage = () => {
  // TODO: remove later
  const tmpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODU1NTI4NiwiZXhwIjoxNjk4NjQxNjg2fQ.u6quTtYFBEPspPFkKbsKklJuuSuVfj7svp8TqlbNzxk';

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

  const submitHandler: SubmitHandler<ProfileEditFormValues> = async ({ email }) => {
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
      {isCheckingAuth
        ? <></>
        : (<MainContainer>
            <Title>E-mail</Title>
            <ProfileForm<ProfileEditFormValues>
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
                  <FormContainer>
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
                  </FormContainer>
                  <ButtonWrapper>
                    <SubmitButton type='submit'>
                      Save
                    </SubmitButton>
                  </ButtonWrapper>
                </>
              )}
            </ProfileForm>
          </MainContainer>)
        }
    </DashboardLayout>
  );
};

export default EditEmailPage;
