import { ReactNode } from 'react';
import AuthGuard from './auth/AuthGuard';

type Props = {
  children?: ReactNode
};

const ProtectedRoute = ({ children }: Props) => {
  return (
    <>
      <AuthGuard />
      {children}
    </>
  );
};

export default ProtectedRoute;
