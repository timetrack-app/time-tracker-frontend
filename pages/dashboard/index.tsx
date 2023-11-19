import { ReactElement } from 'react';
import DashboardPage from '../../components/pages/dashboard/DashboardPage';
import BaseProtectedRouteLayout from '../../components/layouts/BaseProtectRouteLayout';

const Dashboard = () => <DashboardPage />;

Dashboard.getLayout = (page: ReactElement) => (
  <BaseProtectedRouteLayout>{page}</BaseProtectedRouteLayout>
);

export default Dashboard;
