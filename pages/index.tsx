import { useEffect } from 'react';
import styled from 'styled-components';
import { useIsFetching, useIsMutating } from 'react-query';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { selectActiveTask, updateActiveTaskName } from '../stores/slices/activeTaskSlice';

import MainTimer from '../components/elements/MainTimer/MainTimer';
import SubSection from '../components/elements/SubSection/SubSection';
import LoadingOverlay from '../components/elements/LoadingOverlay/LoadingOverlay';

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

  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  const { name, isTimerRunning, elapsedSeconds } = useAppSelector(selectActiveTask);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
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
