import styled from 'styled-components';

import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';
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
  const [isBelowBreakPoint] = useWindowResize();

  // Timer components for mobile view

  return (
    <Container>
      <MainTimerContainer>
        {isBelowBreakPoint ? (
          <TimerCarousel
            totalTimeSec={totalTimeSec}
            totalTimeSecInSelectedTab={totalTimeSecInSelectedTab}
            onClickStartSession={onClickStartSession}
          />
        ) : (
          <MainTimer onClickStartSession={onClickStartSession} />
        )}
      </MainTimerContainer>
      <SubSection
        totalSeconds={totalTimeSec}
        totalSecondsOfSelectedTab={totalTimeSecInSelectedTab}
      />
    </Container>
  );
};

export default OnGoingTimerArea;
