import React from 'react';
import styled from 'styled-components';
import { LuPlus } from 'react-icons/lu';

type CreateTaskButtonProps = {
  onClickCreateTaskCard: () => void;
};
const StyledButton = styled.button`
  position: relative;
  width: 100%;
  height: 93px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.colors.secondaryText};
  background: ${({ theme }) => theme.colors.componentBackground};
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
  &:focus {
    border: none;
    outline: 2px solid ${({ theme }) => theme.colors.outline};
  }
`;

const NameP = styled.p`
  font-size: 1.5em;
  font-weight: 400;
`;

const IconSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const CreateTaskButton = ({ onClickCreateTaskCard }: CreateTaskButtonProps) => {
  return (
    <StyledButton onClick={onClickCreateTaskCard}>
      <IconSpan>
        <LuPlus size={24} />
      </IconSpan>
      <NameP>New</NameP>
    </StyledButton>
  );
};

export default CreateTaskButton;
