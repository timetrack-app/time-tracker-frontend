import { useEffect } from 'react';
import styled from 'styled-components';
import { EmblaOptionsType } from 'embla-carousel-react';

import Timer from './Timer/Timer';
import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';

import { useAppDispatch, useAppSelector } from '../../../../../stores/hooks';
import {
  selectActiveTask,
  updateActiveTaskName,
} from '../../../../../stores/slices/activeTaskSlice';
import { breakPoint } from '../../../../../const/styles/breakPoint';
import TimerCarousel from './TimerCarousel/TimerCarousel';
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

  const { name, isTimerRunning, elapsedSeconds } =
    useAppSelector(selectActiveTask);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  const OPTIONS: EmblaOptionsType = { align: 'start', containScroll: 'trimSnaps' }

  const slides = {
    current: <CustomMainTimer taskName="main" isTimerRunning={false} elapsedSeconds={0} />,
    total: <CustomTimer taskName="sub" elapsedSeconds={0} />,
    totalInTab: <CustomTimer taskName="another" elapsedSeconds={0} />,
  };

  return (
    <Container>
      <MainTimerContainer>
        {isBelowBreakPoint
          ? <TimerCarousel slides={slides} options={OPTIONS} />
          : <MainTimer
              taskName={name}
              isTimerRunning={isTimerRunning}
              elapsedSeconds={elapsedSeconds}
            />
        }
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
