import { ReactElement } from 'react';
import DashboardPage from '../../components/pages/dashboard/DashboardPage';
import ProtectedRoute from '../../components/layouts/ProtectRoute';

const Dashboard = () => <DashboardPage />;

Dashboard.getLayout = (page: ReactElement) => (
  <ProtectedRoute>{page}</ProtectedRoute>
);

export default Dashboard;
