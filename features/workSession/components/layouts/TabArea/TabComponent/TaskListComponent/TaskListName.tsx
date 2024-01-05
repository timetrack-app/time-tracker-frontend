import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

// types
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import { TaskList } from '../../../../../../../types/entity';

// const
import {
  astrograniteDebris,
  dryadBark,
  gainsboro,
  washedBlack,
  white,
} from '../../../../../../../const/styles/colors';

// stores
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

// components
import { IconButton } from '../../../../../../../components/elements/common';

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  border-radius: 8px;
  border: 1px solid
    ${({ colorThemeName }) => {
      if (colorThemeName === 'light') return gainsboro;
      return astrograniteDebris;
    }};
  background: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return white;
    return washedBlack;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const NameP = styled.p<{
  colorThemeName: ColorThemeName;
}>`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1em;
  font-weight: 500;
`;

type TaskListNameProps = {
  taskList: TaskList;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
};

const TaskListName = ({ taskList, onOpenMenuPopover }: TaskListNameProps) => {
  const ref = useRef(null);
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv colorThemeName={currentColorThemeName} ref={ref}>
      <NameP colorThemeName={currentColorThemeName}>{taskList.name}</NameP>
      <IconButton onClick={() => onOpenMenuPopover(ref)}>
        <BsThreeDots />
      </IconButton>
    </ContainerDiv>
  );
};

export default TaskListName;
