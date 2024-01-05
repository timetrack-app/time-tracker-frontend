import React from 'react';
import styled from 'styled-components';
import { LuPlus } from 'react-icons/lu';

import { ColorThemeName } from '../../../../types/colorTheme';
import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

type PlusCircleButtonProps = {
  onClickPlusCircleButton: () => void;
};

const PlusButton = styled.button<{ colorThemeName: ColorThemeName }>`
  width: 1.3em;
  height: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.5em;
  font-weight: 400;
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
      <LuPlus size={24} />
    </PlusButton>
  );
};

export default PlusCircleButton;
