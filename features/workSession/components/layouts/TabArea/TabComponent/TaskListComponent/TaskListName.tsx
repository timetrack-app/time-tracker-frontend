import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

// types
import { TaskList } from '../../../../../../../types/entity';

// components
import { IconButton } from '../../../../../../../components/elements/common';

const ContainerDiv = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
`;

const NameP = styled.p`
  font-size: 1em;
  font-weight: 500;
`;

type TaskListNameProps = {
  taskList: TaskList;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
};

const TaskListName = ({ taskList, onOpenMenuPopover }: TaskListNameProps) => {
  const ref = useRef(null);
  return (
    <ContainerDiv ref={ref}>
      <NameP>{taskList.name}</NameP>
      <IconButton onClick={() => onOpenMenuPopover(ref)}>
        <BsThreeDots />
      </IconButton>
    </ContainerDiv>
  );
};

export default TaskListName;
