import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { selectActiveTask, updateActiveTaskName } from '../stores/slices/activeTaskSlice';

import MainTimer from '../components/mainTimer';

// Tmp style
const TestContainer = styled.div`
  width: 310px;
  height: 310px;
`;

const Home = () => {
  const dispatch = useAppDispatch();
  const { name, isTimerRunning, elapsedSeconds } = useAppSelector(selectActiveTask);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  return (
    <TestContainer>
      <MainTimer taskName={name} isTimerRunning={isTimerRunning} elapsedSeconds={elapsedSeconds} />
    </TestContainer>
  );
};

export default Home;
