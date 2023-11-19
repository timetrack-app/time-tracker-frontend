import { ReactNode } from 'react';
import InitColorTheme from './colorTheme/InitColorTheme';

type Props = {
  children?: ReactNode
};

const BasePublicRouteLayout = ({ children }: Props) => {
  return (
    <>
      <InitColorTheme />
      {children}
    </>
  );
};

export default BasePublicRouteLayout;
