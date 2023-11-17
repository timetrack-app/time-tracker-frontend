import { ReactNode } from 'react';
import styled from 'styled-components';
import { ColorThemeName } from '../../../../../types/colorTheme';

const Card = styled.div<{ colorThemeName: ColorThemeName }>`
  width: 100%;
  border: 1px solid ${({ colorThemeName, theme }) => (colorThemeName === 'light' ? theme.colors.text : 'none')};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) => (colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none')};
  padding-bottom: 1.5em;
`;

const CardTitleH1 = styled.h1`
  font-size: 1.125em;
  font-weight: bold;
  padding: 1em;
`;

type Props = {
  title: string
  colorThemeName: ColorThemeName
  children?: ReactNode
};

const ContentsCard = ({ title, colorThemeName, children }: Props) => {
  return (
    <Card colorThemeName={colorThemeName}>
      <CardTitleH1>{title}</CardTitleH1>
      {children}
    </Card>
  );
};

export default ContentsCard;
