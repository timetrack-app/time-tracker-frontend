import styled from 'styled-components';

import Layout from './Layout';

import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';

import { secondsToHHMMSS } from '../../../../../../utils/timer';

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
  title: string
  elapsedSeconds: number
  className?: string
};

/**
 * Circle shaped timer component
 *
 * @param {Props} { taskName, elapsedSeconds }
 * @return {JSX.Element}
 */
const Timer = ({ title, elapsedSeconds, className }: Props) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);

  return (
    <Layout colorThemeName={currentColorThemeName} className={className}>
      <TaskNameWrapperDiv>
        <TaskNameP>{title}</TaskNameP>
      </TaskNameWrapperDiv>
      <ElapsedTimeP>
        {secondsToHHMMSS(elapsedSeconds)}
      </ElapsedTimeP>
    </Layout>
  );
};

export default Timer;
