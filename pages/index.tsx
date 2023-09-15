import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { selectActiveTask, updateActiveTaskName } from '../stores/slices/activeTaskSlice';

import MainTimer from '../components/elements/MainTimer/MainTimer';
import SubSection from '../components/elements/SubSection/SubSection';

// Tmp style
const TestContainer = styled.div`
  width: 310px;
  height: 310px;
  margin-bottom: 50px;
`;

const SubSectionWrapper = styled.div`
  width: 310px;
`;

const Home = () => {
  const dispatch = useAppDispatch();
  const { name, isTimerRunning, elapsedSeconds } = useAppSelector(selectActiveTask);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  return (
    <>
      <TestContainer>
        <MainTimer
          taskName={name}
          isTimerRunning={isTimerRunning}
          elapsedSeconds={elapsedSeconds}
        />
      </TestContainer>
      <SubSectionWrapper>
        <SubSection
          totalSeconds={8000}
          selectedTabName="Tab name here"
          totalSecondsOfSelectedTab={5400}
        />
      </SubSectionWrapper>
    </>
  );
};

export default Home;
