import styled from 'styled-components';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../stores/hooks';
import {
  selectActiveTask,
  updateActiveTaskName,
} from '../../../../../stores/slices/activeTaskSlice';
import MainTimer from './MainTimer/MainTimer';
import SubSection from './SubSection/SubSection';
import { breakPoint } from '../../../../../const/styles/breakPoint';
import EmblaCarousel from '../CarouselSample';
import { EmblaOptionsType } from 'embla-carousel-react';
import { useWindowResize } from '../../../../../hooks/useWindowResize';

const Container = styled.div`
  width: 310px;
  height: 100%;
`;
const MainTimerContainer = styled.div`
  height: 310px;
  margin-bottom: 16px;
`;

const OnGoingTimerArea = () => {
  const dispatch = useAppDispatch();

  const [isBelowBreakPoint] = useWindowResize();
  console.log(isBelowBreakPoint);

  const { name, isTimerRunning, elapsedSeconds } =
    useAppSelector(selectActiveTask);

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    dispatch(updateActiveTaskName('Sample task 01'));
  }, [dispatch]);

  const OPTIONS: EmblaOptionsType = { align: 'start', containScroll: 'trimSnaps' }

  return (
    <Container>
      <MainTimerContainer>
        {isBelowBreakPoint
          ? <EmblaCarousel slides={[1,2,3,4]} options={OPTIONS} />
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
