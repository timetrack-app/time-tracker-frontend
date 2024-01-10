import { useRouter } from 'next/router';
import { useEmailVerification, useIsAuthenticated } from '../../../features/auth';
import { LoadingOverlay } from '../../elements/common';
import Verified from './Verified';
import Unverified from './Unverified';
import { useAppDispatch } from '../../../stores/hooks';
import { login } from '../../../stores/slices/authSlice';
import { useAnyTrue } from '../../../hooks/useAnyTrue';
import { showToast } from '../../../libs/react-toastify/toast';
import { setUserLoginCookie } from '../../../utils/cookie/auth';

/**
 * Verify the user's email address
 * verified: show the success view and login
 * unverified: show the failed view
 *
 * @return {JSX.Element}
 */
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
    isLoading: isLoadingLoggedInUser,
  } = useIsAuthenticated(
    verificationRes?.token,
    {
      enabled: verificationRes !== undefined,
      onError: () => {
        showToast('error', 'Failed to login.');
      },
      onSuccess: (loggedInUser) => {
        setUserLoginCookie(verificationRes?.token);
        dispatch(login(loggedInUser));
      },
    }
  );

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
