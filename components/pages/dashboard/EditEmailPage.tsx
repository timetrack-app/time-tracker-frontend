import { SubmitHandler } from 'react-hook-form';
import { DashboardLayout }  from '../../../features/dashboard';
import { ProfileForm } from '../../../features/dashboard';
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
import { useAppSelector } from '../../../stores/hooks';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';

type EmailEditFormValues = {
  email: string
};

const EditEmailPage = () => {
  const authToken = getUserLoginCookie();
  const user = useAppSelector(selectLoggedInUser);

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
