import React from 'react';

import Timer from '../Timer/Timer';
import StartWorkSessionButton from './StartWorkSessionButton';
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectActiveTask } from '../../../../../../stores/slices/activeTaskSlice';
import { selectWorkSessionState } from '../../../../../../stores/slices/workSessionSlice';

type Props = {
  className?: string;
  onClickStartSession: () => void;
};

/**
 * Main timer component
 * Display elapsed time of the a current active task
 *
 * @param {Props} { taskName }
 * @return {JSX.Element}
 */
const MainTimer = ({ className, onClickStartSession }: Props) => {
  const { name: title, elapsedSeconds } = useAppSelector(selectActiveTask);
  const { isWorkSessionActive } = useAppSelector(selectWorkSessionState);

  return (
    <>
      {isWorkSessionActive ? (
        <Timer
          title={title}
          elapsedSeconds={elapsedSeconds}
          className={className}
        />
      ) : (
        <StartWorkSessionButton
          onClick={onClickStartSession}
          className={className}
        />
      )}
    </>
  );
};

export default MainTimer;
