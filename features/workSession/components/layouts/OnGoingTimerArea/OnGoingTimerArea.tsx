import styled from 'styled-components';
import MainTimer from './MainTimer/MainTimer';

const Container = styled.div`
  width: 288px;
  height: 100%;
`;
const MainTimerContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 12px;
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
  return (
    <Container>
      <MainTimerContainer>
        <MainTimer onClickStartSession={onClickStartSession} />
      </MainTimerContainer>
    </Container>
  );
};

export default OnGoingTimerArea;
