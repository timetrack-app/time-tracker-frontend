import ProtectedRoute from '../components/layouts/ProtectRoute';
import LoginPage from '../components/pages/login/LoginPage';
import { AuthFormLayout } from '../features/auth/index';

/**
 * User login form
 *
 * @return {JSX.Element}
 */
const Login = () => <LoginPage />;

Login.getLayout = (page: React.ReactElement) => (
  <ProtectedRoute>
    <AuthFormLayout>{page}</AuthFormLayout>
  </ProtectedRoute>
);

export default Login;
