import { useIsAuthenticated } from '../../../features/auth/api/hooks/useIsAuthenticated';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { useAppDispatch } from '../../../stores/hooks';
import { login, logout } from '../../../stores/slices/authSlice';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';

/**
 * Check if the token is expired or not (to check if the user logged in)
 *
 *
 */
const AuthGuard = () => {
  const dispatch = useAppDispatch();

  const authToken = getUserLoginCookie();

  const { isLoading } = useIsAuthenticated(authToken, {
    onSuccess(user) {
      const { id, email, isVerified } = user;
      dispatch(login({ id, email, isVerified }));
    },
    onError: () => {
      dispatch(logout);
    },
  });

  return <LoadingOverlay loading={isLoading} />
};

export default AuthGuard;
