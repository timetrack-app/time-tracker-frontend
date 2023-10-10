import { useEffect } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import styled from 'styled-components';

import OnGoingTimerArea from '../../../features/workSession/components/elements/OnGoingTimerArea/OnGoingTimerArea';
import TabsArea from '../../../features/workSession/components/elements/TabArea/TabsArea';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import MobileMenu from '../../elements/common/MobileMenu/MobileMenu';
import Navbar from '../../elements/Navbar/Navbar';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { selectIsWorkSessionActive } from '../../../stores/slices/workSessionSlice';
import { selectActiveTask, updateActiveTask } from '../../../stores/slices/activeTaskSlice';
import { selectCurrentSelectedTab } from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';

import { useElapsedTimeCalc } from '../../../hooks/useElapsedTimeCalc';

import { testTabs } from './dummyData';

const MainAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  min-height: 100vh;
  gap: 24px;
  padding: 2em 1.5em 1.5em;

  @media ${breakPoint.tablet} {
    min-height: auto;
    flex-direction: row;
    align-items: normal;
    padding-inline: 24px;
    padding-bottom: 24px;
  }
`;

const HomePage = () => {
  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  const dispatch = useAppDispatch();
  const isWorkSessionActive = useAppSelector(selectIsWorkSessionActive);
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  // TODO: temporary solution. fix later
  const tabs = testTabs;

  const { calcTotalTimeSec, calcTotalTimeSecOfATab } = useElapsedTimeCalc();

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    if (isWorkSessionActive) {
      dispatch(updateActiveTask({
        tabId: tabs[0].id,
        listId: tabs[0].taskLists[0].id,
        id: tabs[0].taskLists[0].tasks[0].id,
        name: tabs[0].taskLists[0].tasks[0].name,
        elapsedSeconds: tabs[0].taskLists[0].tasks[0].totalTime,
        isTimerRunning: true,
      }));
    }
  }, [isWorkSessionActive]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Navbar />
      <MobileMenu />
      <MainAreaContainer>
        <OnGoingTimerArea
          totalTimeSec={calcTotalTimeSec(tabs)}
          totalTimeSecInSelectedTab={calcTotalTimeSecOfATab(tabs, selectedTab.id)}
        />
        <TabsArea tabs={testTabs} />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
