import { removeUserLoginCookie } from '../../../../utils/cookie/auth';
import { useAppDispatch } from '../../../../stores/hooks';
import { logout } from '../../../../stores/slices/authSlice';

/**
 * Custom hook for user logout
 *
 * @return {*}
 */
export const useUserLogout = () => {
  const dispatch = useAppDispatch();

  // Named this function "mutate" as consistency in the code
  const mutate = () => {
    removeUserLoginCookie();
    dispatch(logout());
  };

  return { mutate };
};
