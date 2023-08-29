import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TaskNameWrapperDiv = styled.div`
  border: 1px solid #37352f;
  border-radius: 16px;
  width: 85%;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// TODO: fix it later (the code below is from chatGPT so...)

const MainTimer = () => {
  // Timer is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // How many seconds has passed
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        // update elapsedTime every 1 sec
        setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
      }, 1000);
    } else if (intervalId) clearInterval(intervalId);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  /**
   * Format seconds to HH:mm:ss
   *
   * @param {number} seconds
   * @return {*}  {string}
   */
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const toStr0Pad = (time: number) => (
      time.toString().padStart(2, '0')
    );

    return `${toStr0Pad(hours)}:${toStr0Pad(minutes)}:${toStr0Pad(remainingSeconds)}`;
  };

  return (
    <ContainerDiv>
      <TaskNameWrapperDiv>
        <p>Task name</p>
      </TaskNameWrapperDiv>
      <p>
        {formatTime(elapsedSeconds)}
        {' '}
        sec
      </p>
      <button type="button" onClick={start} disabled={isRunning}>
        START
      </button>
      <button type="button" onClick={stop} disabled={!isRunning}>
        STOP
      </button>
      <button type="button" onClick={reset}>RESET</button>
    </ContainerDiv>
  );
};

export default MainTimer;
