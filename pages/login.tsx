import ProtectedRoute from '../components/layouts/ProtectRoute';
import LoginPage from '../components/pages/login/LoginPage';
import { AuthFormLayout } from '../features/auth/index';

/**
 * User login form
 *
 * @return {*} JSX.Element
 */
const Login = () => (<LoginPage />);

// TODO: where to check auth?(because login form appears before auth checking has done)

Login.getLayout = (page: React.ReactElement) => (
  <ProtectedRoute>
    <AuthFormLayout>{page}</AuthFormLayout>
  </ProtectedRoute>
);

export default Login;
