import styled from 'styled-components';
import { EmblaOptionsType } from 'embla-carousel-react';

import Timer from './Timer/Timer';
import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';
import TimerCarousel from './TimerCarousel/TimerCarousel';

import { useAppSelector } from '../../../../../stores/hooks';
import { selectActiveTask } from '../../../../../stores/slices/activeTaskSlice';
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

type Props = {
  totalTimeSec?: number;
  totalTimeSecInSelectedTab?: number;
  onClickStartSession: () => void;
};

const OnGoingTimerArea = ({
  totalTimeSec = 0,
  totalTimeSecInSelectedTab = 0,
  onClickStartSession,
}: Props) => {
  const activeTask = useAppSelector(selectActiveTask);
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  const [isBelowBreakPoint] = useWindowResize();

  //　https://www.embla-carousel.com/api/options/
  const carouselOptions: EmblaOptionsType = {
    align: 'start',
    containScroll: 'trimSnaps',
  };

  // Timer components for mobile view
  const slides = {
    // TODO: Fix current timer later...
    current: (
      <CustomMainTimer
        title={activeTask.name}
        isTimerRunning={activeTask.isTimerRunning}
        elapsedSeconds={activeTask.elapsedSeconds}
        onClickStartSession={onClickStartSession}
      />
    ),
    total: <CustomTimer title="Total Time" elapsedSeconds={totalTimeSec} />,
    totalInTab: (
      <CustomTimer
        title={`${selectedTab.name} Total Time`}
        elapsedSeconds={totalTimeSecInSelectedTab}
      />
    ),
  };

  return (
    <Container>
      <MainTimerContainer>
        {isBelowBreakPoint ? (
          <TimerCarousel slides={slides} options={carouselOptions} />
        ) : (
          <MainTimer
            title={activeTask.name}
            isTimerRunning={activeTask.isTimerRunning}
            elapsedSeconds={activeTask.elapsedSeconds}
            onClickStartSession={onClickStartSession}
          />
        )}
      </MainTimerContainer>
      <SubSection
        totalSeconds={totalTimeSec}
        selectedTabName="Tab name here"
        totalSecondsOfSelectedTab={totalTimeSecInSelectedTab}
      />
    </Container>
  );
};

export default OnGoingTimerArea;
