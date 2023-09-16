import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { selectColorTheme } from '../../../stores/slices/colorThemeSlice';
import {
  updateIsTimerRunning,
  incrementElapsedSeconds,
  resetTimer,
} from '../../../stores/slices/activeTaskSlice';

import { secondsToHHMMSS } from '../../../utils/timer';

import { ColorThemeName } from '../../../types/colorTheme';

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2em;
  box-shadow: ${({ colorThemeName, theme }) => (colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none')};
`;

const TaskNameWrapperDiv = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  width: 80%;
  padding: 0.3em 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TaskNameP = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ElapsedTimeP = styled.p`
  display: block;
  font-size: 3em;
  font-weight: bold;
  max-width: 100%;
  text-align: center;
`;

type Props = {
  taskName: string
  isTimerRunning: boolean
  elapsedSeconds: number
};

/**
 * Main timer component
 * Display elapsed time of the a current active task
 *
 * @param {Props} { taskName }
 * @return {JSX.Element}
 */
const MainTimer = ({ taskName, isTimerRunning, elapsedSeconds }: Props) => {
  const dispatch = useAppDispatch();

  const currentColorThemeName = useAppSelector(selectColorTheme);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        // update elapsedTime every 1 sec
        dispatch(incrementElapsedSeconds());
      }, 1000);
    } else if (intervalId) clearInterval(intervalId);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [dispatch, isTimerRunning]);

  const start = () => dispatch(updateIsTimerRunning(true));

  const stop = () => dispatch(updateIsTimerRunning(false));

  const reset = () => dispatch(resetTimer());

  // TODO: Make sure how to stop timer

  return (
    <>
      <ContainerDiv colorThemeName={currentColorThemeName}>
        <TaskNameWrapperDiv>
          <TaskNameP>{taskName}</TaskNameP>
        </TaskNameWrapperDiv>
        <ElapsedTimeP>
          {secondsToHHMMSS(elapsedSeconds)}
        </ElapsedTimeP>
      </ContainerDiv>

      {/* TODO: remove buttons later. This is temporary solution to start/stop the timer */}
      <div>
        <button type="button" onClick={start} disabled={isTimerRunning}>START</button>
        <button type="button" onClick={stop} disabled={!isTimerRunning}>STOP</button>
        <button type="button" onClick={reset}>RESET</button>
      </div>
    </>
  );
};

export default MainTimer;
