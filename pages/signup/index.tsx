import ProtectedRoute from '../../components/layouts/ProtectRoute';
import SignUpPage from '../../components/pages/signup/SignUpPage';
import { AuthFormLayout } from '../../features/auth/index';

/**
 * User registration page
 *
 * @return {*} JSX.Element
 */
const SignUp = () => (<SignUpPage />);

SignUp.getLayout = (page: React.ReactElement) => (
  <ProtectedRoute>
    <AuthFormLayout>{page}</AuthFormLayout>
  </ProtectedRoute>
);

export default SignUp;
