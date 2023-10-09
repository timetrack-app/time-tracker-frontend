import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';
import {
  updateIsTimerRunning,
  incrementElapsedSeconds,
  resetTimer,
} from '../../../../../../stores/slices/activeTaskSlice';
import { selectIsWorkSessionActive } from '../../../../../../stores/slices/workSessionSlice';

import Timer from '../Timer/Timer';
import StartWorkSessionButton from './StartWorkSessionButton';

type Props = {
  title: string
  isTimerRunning: boolean
  elapsedSeconds: number
  className?: string
};

/**
 * Main timer component
 * Display elapsed time of the a current active task
 *
 * @param {Props} { taskName }
 * @return {JSX.Element}
 */
const MainTimer = ({ title, isTimerRunning, elapsedSeconds, className }: Props) => {
  // const dispatch = useAppDispatch();

  const currentColorThemeName = useAppSelector(selectColorTheme);
  const hasWorkSessionStarted = useAppSelector(selectIsWorkSessionActive);

  // TODO: move these functions to right components
  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout | null = null;

  //   if (isTimerRunning) {
  //     intervalId = setInterval(() => {
  //       // update elapsedTime every 1 sec
  //       dispatch(incrementElapsedSeconds());
  //     }, 1000);
  //   } else if (intervalId) clearInterval(intervalId);

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [dispatch, isTimerRunning]);

  // TODO: move these functions to right components
  // const start = () => dispatch(updateIsTimerRunning(true));

  // const stop = () => dispatch(updateIsTimerRunning(false));

  // const reset = () => dispatch(resetTimer());

  // TODO: Make sure how to stop timer

  // TODO: Display start button if work session has not started yet

  // TODO: If no onGoingTask, display message in TaskNameP

  return (
    <>
      {hasWorkSessionStarted
        ? <Timer title={title} elapsedSeconds={elapsedSeconds} />
        : <StartWorkSessionButton className={className} />
      }
      {/* TODO: remove buttons later. This is temporary solution to start/stop the timer */}
      {/* <div>
        <button type="button" onClick={start} disabled={isTimerRunning}>START</button>
        <button type="button" onClick={stop} disabled={!isTimerRunning}>STOP</button>
        <button type="button" onClick={reset}>RESET</button>
      </div> */}
    </>
  );
};

export default MainTimer;
