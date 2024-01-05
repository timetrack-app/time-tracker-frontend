import React from 'react';
import styled from 'styled-components';
import { LuPlus } from 'react-icons/lu';

type StyledButtonProps = {
  size?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
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

type PlusButtonProps = {
  iconSize?: number;
  onClickPlusButton: () => void;
} & StyledButtonProps;

const PlusButton = ({
  size = '1em',
  iconSize = 24,
  onClickPlusButton,
}: PlusButtonProps) => {
  return (
    <StyledButton size={size} onClick={onClickPlusButton}>
      <LuPlus size={iconSize} />
    </StyledButton>
  );
};

export default PlusButton;
