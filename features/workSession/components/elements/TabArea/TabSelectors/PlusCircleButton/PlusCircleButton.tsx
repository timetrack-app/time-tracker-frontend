import React from 'react';
import styled from 'styled-components';
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

type PlusCircleButtonProps = {
  onClickPlusCircleButton: () => void;
};

const PlusButton = styled.button<{colorThemeName: ColorThemeName}>`
  width: 1.3em;
  height: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 20px;
  font-weight: 400;
  padding: 0.5em;
  margin-right: 1em;
  margin-bottom: 0.5em;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.5;
  }
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 3px 6px 0 ${theme.colors.border}` : 'none'};
`;

const PlusCircleButton = ({
  onClickPlusCircleButton,
}: PlusCircleButtonProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <PlusButton
      colorThemeName={currentColorThemeName}
      onClick={onClickPlusCircleButton}
      type="button"
    >
      +
    </PlusButton>
  );
};

export default PlusCircleButton;
