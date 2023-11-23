import { useRouter } from 'next/router';
import { useEmailVerification, useIsAuthenticated } from '../../../features/auth';
import { login } from '../../../stores/slices/authSlice';
import { LoadingOverlay } from '../../elements/common';
import Verified from './Verified';
import Unverified from './Unverified';
import { useAppDispatch } from '../../../stores/hooks';
import { useAnyTrue } from '../../../hooks/useAnyTrue';
import { showToast } from '../../../libs/react-toastify/toast';

const EmailVerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const dispatch = useAppDispatch();

  const {
    data: verificationRes,
    isLoading: isVerifying,
    isError,
    isSuccess: isVerificationSuccess,
  } = useEmailVerification(
    token as string,
    {
      enabled: token !== undefined,
    }
  );

  const {
    // data: loggedInUser,
    isLoading: isLoadingLoggedInUser,
  } = useIsAuthenticated(
    verificationRes?.token,
    {
      enabled: verificationRes !== undefined,
      onError: () => {
        showToast('error', 'Failed to login.');
      },
      onSuccess: (loggedInUser) => {
        dispatch(login(loggedInUser));
      },
    }
  );

  // TODO: need to fix backend code(link in the email)

  // TODO: GET: verify (token from parameter) (loading view)
  // http://localhost:4000/auth/email-verification?token=dfa24156aa78d8546c5875a64adc3cf090d6c94b8b09145fedf57e8dac5256e2

  // TODO: success -> success view(another component)
  // TODO: fail -> failed view(another component)

  const isLoading = useAnyTrue([
    isVerifying,
    isLoadingLoggedInUser,
  ]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      {isVerificationSuccess && <Verified />}
      {isError && <Unverified />}
    </>
  );
};

export default EmailVerificationPage;
