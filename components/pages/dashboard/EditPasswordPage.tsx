import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { DashboardLayout, ProfileForm, PasswordInput } from '../../../features/dashboard';
import { useUpdatePassword } from '../../../features/profile';

import { passwordMaxLen, passwordMinLen } from '../../../const/validation/rules/password';
import {
  invalidPasswordLength,
  passwordConfirmationMismatch,
  passwordConfirmationRequired,
  passwordRequired,
} from '../../../const/validation/messages';

import { useAppSelector } from '../../../stores/hooks';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';

import { MainContainer, ButtonWrapper, SubmitButton } from './styles/sharedStyles';

import { getWebRoute } from '../../../routes/web';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { showToast } from '../../../libs/react-toastify/toast';

type PasswordEditFormValues = {
  password: string
  passwordConfirmation: string
};

const EditPasswordPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const user = useAppSelector(selectLoggedInUser);

  const {
    isLoading: isUpdatingPassword,
    mutate: updatePassword,
  } = useUpdatePassword();

  const submitHandler: SubmitHandler<PasswordEditFormValues> = async ({
    password,
    passwordConfirmation,
  }) => {
    await updatePassword(
      {
        authToken: getUserLoginCookie(),
        userId: user.id,
        password,
        passwordConfirmation,
      },
      {
        onError: () => {
          showToast('error', 'Failed to update the password.');
        },
        onSuccess: () => {
          showToast('success', 'Password updated!');
        },
      },
    );
  };

  return (
    <DashboardLayout backButtonHref={getWebRoute('dashboard')}>
      <LoadingOverlay loading={isUpdatingPassword} />
      <MainContainer>
        <h1>Password</h1>
        <ProfileForm<PasswordEditFormValues>
          onSubmit={submitHandler}
        >
          {({ register, formState, watch }) => (
            <>
              {console.log('e:',formState.errors)}
              <div>
                <PasswordInput
                  registration={register('password', {
                    required: passwordRequired,
                    validate: (val: string) => {
                      if (val.length < passwordMinLen || val.length > passwordMaxLen) {
                        return invalidPasswordLength;
                      }
                      if (watch('password') != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  error={formState.errors.password}
                  isVisible={isVisible}
                  iconOnClick={toggleVisibility}
                />
                <PasswordInput
                  registration={register('passwordConfirmation', {
                    required: passwordConfirmationRequired,
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return passwordConfirmationMismatch;
                      }
                    },
                  })}
                  error={formState.errors.passwordConfirmation}
                  isVisible={isVisible}
                  iconOnClick={toggleVisibility}
                />
              </div>
              <ButtonWrapper>
                <SubmitButton type="submit">
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

export default EditPasswordPage;
