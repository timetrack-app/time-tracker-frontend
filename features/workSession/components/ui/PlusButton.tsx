import React from 'react';
import styled from 'styled-components';
import { LuPlus } from 'react-icons/lu';

import { ColorThemeName } from '../../../../types/colorTheme';
import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

type PlusButtonProps = {
  onClickPlusButton: () => void;
};

const StyledButton = styled.button<{ colorThemeName: ColorThemeName }>`
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.5em;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
`;

const PlusButton = ({ onClickPlusButton }: PlusButtonProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <StyledButton
      colorThemeName={currentColorThemeName}
      onClick={onClickPlusButton}
      type="button"
    >
      <LuPlus size={24} />
    </StyledButton>
  );
};

export default PlusButton;
