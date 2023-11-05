import { useIsAuthenticated } from '../../../features/auth/api/hooks/useIsAuthenticated';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { useAppDispatch } from '../../../stores/hooks';
import { logout } from '../../../stores/slices/authSlice';

const AuthGuard = () => {
  const dispatch = useAppDispatch();
  // const authToken = getUserLoginCookie();

  // TODO: tmpToken. remove later
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5OTEzMzI4MiwiZXhwIjoxNjk5MjE5NjgyfQ.I-TZIJRPqtxVex3jqa960CbvAywlSyzbPI4RYPXe1_4';

  useIsAuthenticated(authToken, {
    onError: () => {
      dispatch(logout);
    },
  });

  return null;
};

export default AuthGuard;
