import styled from 'styled-components';

import Layout from './Layout';
import ControlButton from './ControlButton';

import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';

import { secondsToHHMMSS } from '../../../../../../utils/timer';

const TaskNameWrapperDiv = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  /* width: 80%; */
  padding: 0.2em 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.2em;
  width: 14.5em;
`;

const MainAreaDiv = styled.div`
  /* margin-bottom: 2em; */
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 1em;
`;

const TaskNameP = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TaskNameMutedP = styled(TaskNameP)`
  color: ${({ theme }) => theme.colors.border};
`;

const TotalTimeP = styled.p`
  display: block;
  font-size: 3em;
  font-weight: bold;
  max-width: 100%;
  text-align: center;
`;

const TotalTimeMutedP = styled(TotalTimeP)`
  color: ${({ theme }) => theme.colors.border};
`;

const ButtonAreaDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5em;
`;

type Props = {
  title: string;
  totalTime: number;
  className?: string;
};

/**
 * Circle shaped timer component
 * TODO: need to pass props that can tell:
 * TODO: - if there's an active task
 * TODO: - if the task is paused or not
 *
 * @param {Props} { taskName, totalTime }
 * @return {JSX.Element}
 */
const Timer = ({ title, totalTime, className }: Props) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  // TODO: Fix
  // TODO: (For now it's active if title is not empty.)

  return (
    <Layout colorThemeName={currentColorThemeName} className={className}>
      <MainAreaDiv>
        <TaskNameWrapperDiv>
          {
            title
              ? <TaskNameP>{title}</TaskNameP>
              : <TaskNameMutedP>Please start a task</TaskNameMutedP>
          }
        </TaskNameWrapperDiv>
        {
          title
           ? <TotalTimeP>{secondsToHHMMSS(totalTime)}</TotalTimeP>
           : <TotalTimeMutedP>00:00:00</TotalTimeMutedP>
        }
      </MainAreaDiv>

      <ButtonAreaDiv>
        <ControlButton isActive={false} isPaused={false} />
      </ButtonAreaDiv>
    </Layout>
  );
};

export default Timer;
