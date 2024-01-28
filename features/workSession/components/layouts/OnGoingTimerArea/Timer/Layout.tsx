import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { ColorThemeName } from '../../../../../../types/colorTheme';

export const baseStyle = css<{ colorThemeName: ColorThemeName }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`;

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  ${baseStyle}
`;

type Props = {
  colorThemeName: ColorThemeName;
  className?: string;
  children?: ReactNode;
};

const Layout = ({ colorThemeName, className, children }: Props) => (
  <ContainerDiv colorThemeName={colorThemeName} className={className}>
    {children}
  </ContainerDiv>
);

export default Layout;
