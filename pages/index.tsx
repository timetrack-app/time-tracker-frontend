import { ReactElement } from 'react';
import HomePage from '../components/pages/home/HomePage';
import BaseProtectedRouteLayout from '../components/layouts/BaseProtectRouteLayout';

const Home = () => <HomePage />;

Home.getLayout = (page: ReactElement) => (
  <BaseProtectedRouteLayout>{page}</BaseProtectedRouteLayout>
);

export default Home;
