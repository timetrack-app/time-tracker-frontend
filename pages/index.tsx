import { ReactElement } from 'react';
import HomePage from '../components/pages/home/HomePage';
import ProtectedRoute from '../components/layouts/ProtectRoute';

const Home = () => <HomePage />;

Home.getLayout = (page: ReactElement) => (
  <ProtectedRoute>{page}</ProtectedRoute>
);

export default Home;
