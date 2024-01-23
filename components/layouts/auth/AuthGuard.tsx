import { useRouter } from 'next/router';
import { useIsAuthenticated } from '../../../features/auth/api/hooks/useIsAuthenticated';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { useAppDispatch } from '../../../stores/hooks';
import { login } from '../../../stores/slices/authSlice';
import { useUserLogout } from '../../../features/auth/api/hooks/useUserLogout';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import { getWebRoute } from '../../../routes/web';

/**
 * Check if a user is logged in
 * If the user isn't logged in, redirect to the login page
 *
 *
 */
const AuthGuard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authToken = getUserLoginCookie();
  const { mutate: logout } = useUserLogout();
  const { isLoading } = useIsAuthenticated(authToken, {
    onSuccess(user) {
      const { id, email, isVerified } = user;
      dispatch(login({ id, email, isVerified }));
    },
    onError: () => {
      logout();
      router.push(getWebRoute('login'));
    },
  });

  return <LoadingOverlay loading={isLoading} />;
};

export default AuthGuard;
