import React from 'react';
import styled from 'styled-components';
import { LuPlus } from 'react-icons/lu';

type CreateTaskFormTriggerProps = {
  onClickCreateTaskCard: () => void;
};
const StyledButton = styled.button`
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
    /* border: none; */
    outline: 2px solid ${({ theme }) => theme.colors.outline};
  }
  &:active {
    border: none;
    outline: none;
  }
`;

const NameP = styled.p`
  font-size: 1.5em;
  font-weight: 400;
  text-align: left;
`;

const IconSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const CreateTaskFormTrigger = ({
  onClickCreateTaskCard,
}: CreateTaskFormTriggerProps) => {
  return (
    <StyledButton onClick={onClickCreateTaskCard}>
      <IconSpan>
        <LuPlus size={24} />
      </IconSpan>
      <NameP>New task</NameP>
    </StyledButton>
  );
};

export default CreateTaskFormTrigger;
