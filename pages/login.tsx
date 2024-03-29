import AuthGuard from '../components/layouts/auth/AuthGuard';
import LoginPage from '../components/pages/login/LoginPage';
import { AuthFormLayout } from '../features/auth/index';

/**
 * User login form
 *
 * @return {JSX.Element}
 */
const Login = () => <LoginPage />;

Login.getLayout = (page: React.ReactElement) => (
  <>
    <AuthGuard />
    <AuthFormLayout>{page}</AuthFormLayout>
  </>
);

export default Login;
