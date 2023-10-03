import styled from 'styled-components';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../stores/hooks';
import {
  selectActiveTask,
  updateActiveTaskName,
} from '../../../../../stores/slices/activeTaskSlice';
import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';

const Container = styled.div`
  width: 310px;
  height: 100%;
`;
const MainTimerContainer = styled.div`
  height: 310px;
  margin-bottom: 16px;
`;

const OnGoingTimerArea = () => {
  const dispatch = useAppDispatch();

  const { name, isTimerRunning, elapsedSeconds } =
    useAppSelector(selectActiveTask);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  return (
    <Container>
      <MainTimerContainer>
        <MainTimer
          taskName={name}
          isTimerRunning={isTimerRunning}
          elapsedSeconds={elapsedSeconds}
        />
      </MainTimerContainer>
      <SubSection
        totalSeconds={8000}
        selectedTabName="Tab name here"
        totalSecondsOfSelectedTab={5400}
      />
    </Container>
  );
};

export default OnGoingTimerArea;
