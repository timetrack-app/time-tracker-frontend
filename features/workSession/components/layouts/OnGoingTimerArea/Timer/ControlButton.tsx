import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { coralRed, vegetation } from '../../../../../../const/styles/colors';

const InitialDiv = styled.div`
  color: ${({ theme }) => theme.colors.border};
  font-weight: 500;
`;

const TimerButton = styled.button`
  appearance: none;
  border: none;
  background-color: inherit;
  cursor: pointer;
  padding: 0;
  width: 2.5em;
  height: 100%;
`;

const ResumeIcon = styled(FaPlay)`
  width: 100%;
  height: 100%;
  padding-left: 0.3em;
  color: ${vegetation};
`;

const PauseIcon = styled(FaPause)`
  width: 100%;
  height: 100%;
  color: ${coralRed};
`;

type Props = {
  isActive: boolean
  isPaused: boolean
};

/**
 * Pause/Resume button in MainTimer
 * Message will be shown if no task is active
 *
 * @param {Props} { isActive, isPaused }
 * @return {JSX.Element}
 */
const ControlButton = ({ isActive, isPaused }: Props) => {
  return (
    <>
      {
        isActive
          ? <TimerButton>
              {isPaused ? <ResumeIcon /> : <PauseIcon />}
            </TimerButton>
          : <InitialDiv />
      }
    </>
  );
};

export default ControlButton;
