import { ReactNode } from 'react';
import InitColorTheme from './colorTheme/InitColorTheme';
import AuthGuard from './auth/AuthGuard';

type Props = {
  children?: ReactNode
};

const BaseProtectedRouteLayout = ({ children }: Props) => {
  return (
    <>
      <InitColorTheme />
      <AuthGuard />
      {children}
    </>
  );
};

export default BaseProtectedRouteLayout;
