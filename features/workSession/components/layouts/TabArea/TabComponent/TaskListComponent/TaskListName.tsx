import React, { useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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

type TaskListNameProps = {
  taskList: TaskList;
  isOpenMenubar: boolean;
  toggleMenuBar: (rect: DOMRect, list?: TaskList) => void;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return dryadBark;
    return white;
  }};
  font-size: 20px;
  font-weight: 400;
  padding-left: 12px;
`;

const TaskListName = ({
  taskList,
  isOpenMenubar,
  toggleMenuBar,
}: TaskListNameProps) => {
  const ref = useRef(null);
  const currentColorThemeName = useAppSelector(selectColorTheme);
  const handleToggleMenuBar = () => {
    if (!ref.current) return;
    const rect: DOMRect = ref.current.getBoundingClientRect();
    // passing current list name when opening menubar
    isOpenMenubar ? toggleMenuBar(rect) : toggleMenuBar(rect, taskList);
  };
  return (
    <ContainerDiv colorThemeName={currentColorThemeName} ref={ref}>
      <NameP colorThemeName={currentColorThemeName}>{taskList.name}</NameP>
      <IconButton onClick={handleToggleMenuBar}>
        {isOpenMenubar ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </IconButton>
    </ContainerDiv>
  );
};

export default TaskListName;
