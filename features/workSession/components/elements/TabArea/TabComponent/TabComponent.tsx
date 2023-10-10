import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../types/colorTheme';
import {
  astrograniteDebris,
  gainsboro,
  washedBlack,
  white,
} from '../../../../../../const/styles/colors';
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';
import TaskListComponent from './TaskListComponent/TaskListComponent';
import CreateTaskListButton from './CreateTaskListButton/CreateTaskListButton';
import { breakPoint } from '../../../../../../const/styles/breakPoint';

type TabComponentProps = {
  tab: Tab;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  height: 100%;
  overflow-x: scroll;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid
    ${({ colorThemeName }) => {
      if (colorThemeName === 'light') return gainsboro;
      return astrograniteDebris;
    }};
  background: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return white;
    return washedBlack;
  }};
`;

const TaskListContainerDiv = styled.div`
  /* width: 322px; */

  flex: 0 0 auto;
  width: 100%;

  @media ${breakPoint.tablet} {
    flex: initial;
    width: auto;
  }
`;

const TabComponent = ({ tab }: TabComponentProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  const { taskLists } = tab;
  const handleCreateTaskList = () => {};
  return (
    <ContainerDiv colorThemeName={currentColorThemeName}>
      {taskLists.map((taskList) => (
        <TaskListContainerDiv key={taskList.id}>
          <TaskListComponent taskList={taskList} />
        </TaskListContainerDiv>
      ))}
      <TaskListContainerDiv>
        <CreateTaskListButton onClickCreateTaskList={handleCreateTaskList} />
      </TaskListContainerDiv>
    </ContainerDiv>
  );
};

export default TabComponent;
