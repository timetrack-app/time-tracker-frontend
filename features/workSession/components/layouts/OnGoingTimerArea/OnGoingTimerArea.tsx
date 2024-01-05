import styled from 'styled-components';

import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';
import TimerCarousel from './TimerCarousel/TimerCarousel';

import { useWindowResize } from '../../../../../hooks/useWindowResize';

const mainTimerSize = 288;

const Container = styled.div`
  width: 288px;
  height: 100%;
`;
const MainTimerContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 12px;
`;

const SubSectionContainer = styled.div`
  height: calc(100% - ${mainTimerSize}px - 12px);
`;

type Props = {
  totalTimeSec?: number;
  totalTimeSecInSelectedTab?: number;
  onClickStartSession: () => void;
  onOpenEndWorkSessionConfirmModal: () => void;
};

const OnGoingTimerArea = ({
  totalTimeSec = 0,
  totalTimeSecInSelectedTab = 0,
  onClickStartSession,
  onOpenEndWorkSessionConfirmModal,
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
      <SubSectionContainer>
        <SubSection
          totalSeconds={totalTimeSec}
          totalSecondsOfSelectedTab={totalTimeSecInSelectedTab}
          onOpenEndWorkSessionConfirmModal={onOpenEndWorkSessionConfirmModal}
        />
      </SubSectionContainer>
    </Container>
  );
};

export default OnGoingTimerArea;
