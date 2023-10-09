import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { EmblaOptionsType } from 'embla-carousel-react';

import Timer from './Timer/Timer';
import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';
import TimerCarousel from './TimerCarousel/TimerCarousel';

import { useAppDispatch, useAppSelector } from '../../../../../stores/hooks';
import {
  selectActiveTask,
  updateActiveTaskName,
} from '../../../../../stores/slices/activeTaskSlice';
import { selectCurrentSelectedTab } from '../../../../../stores/slices/selectedTabSlice';


import { useWindowResize } from '../../../../../hooks/useWindowResize';

const Container = styled.div`
  width: 310px;
  height: 100%;
`;
const MainTimerContainer = styled.div`
  height: 310px;
  margin-bottom: 16px;
`;

const CustomMainTimer = styled(MainTimer)`
  box-shadow: none;
`;

const CustomTimer = styled(Timer)`
  box-shadow: none;
`;

// TODO: Props
// currentTaskTime
// totalTime
// totalTimeInTab
type Props = {
  activeTaskName?: string
  activeTaskElapsedTimeSec?: number
  totalTimeSec?: number
  totalTimeSecInSelectedTab?: number
};

const OnGoingTimerArea = ({
  activeTaskName = '',
  activeTaskElapsedTimeSec = 0,
  totalTimeSec = 0,
  totalTimeSecInSelectedTab = 0,
}: Props) => {
  const dispatch = useAppDispatch();

  const [isBelowBreakPoint] = useWindowResize();

  const { name, isTimerRunning, elapsedSeconds } = useAppSelector(selectActiveTask);

  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  //　https://www.embla-carousel.com/api/options/
  const carouselOptions: EmblaOptionsType = {
    align: 'start',
    containScroll: 'trimSnaps',
  };

  // Timer components in mobile view
  const slides = {
    // TODO: Fix current timer later...
    current: <CustomMainTimer title="main" isTimerRunning={false} elapsedSeconds={0} />,
    total: <CustomTimer title="Total Time" elapsedSeconds={0} />,
    totalInTab: <CustomTimer title={`${selectedTab.name} Total Time`} elapsedSeconds={0} />,
  };

  return (
    <Container>
      <MainTimerContainer>
        {isBelowBreakPoint
          ? <TimerCarousel slides={slides} options={carouselOptions} />
          : <MainTimer
              title={name}
              isTimerRunning={isTimerRunning}
              elapsedSeconds={elapsedSeconds}
            />
        }
      </MainTimerContainer>
      <SubSection
        totalSeconds={totalTimeSec}
        selectedTabName="Tab name here"
        totalSecondsOfSelectedTab={totalTimeSecInSelectedTab}
      />
    </Container>
  );
};

export default memo(OnGoingTimerArea);
