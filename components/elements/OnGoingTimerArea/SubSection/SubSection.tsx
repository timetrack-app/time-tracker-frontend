import styled from 'styled-components';

import ButtonDanger from '../../Button/ButtonDanger';

import { useEndWorkSession } from '../../../../features/workSession/api/hooks/useEndWorkSession';

import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

import { secondsToHHMMSS } from '../../../../utils/timer';

import { ColorThemeName } from '../../../../types/colorTheme';
import { white, coralRed } from '../../../../const/styles/colors';

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
  border-radius: 40px;
  padding: 2em;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const SectionDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`;

const SectionTitleWrapperDiv = styled.div`
  width: 100%;
  padding: 0.3em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 16px;
`;

const SectionTitleP = styled.p`
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

const ButtonTextP = styled.p`
  display: block;
  color: ${white};
  font-weight: 500;
`;

const ButtonCustom = styled(ButtonDanger)`
  padding: 0.5em 1em;
`;

type SubSectionProps = {
  totalSeconds: number;
  selectedTabName: string;
  totalSecondsOfSelectedTab: number;
};

// TODO: totalSeconds:
//  sum of total_time of all tasks(from the latest work session) + selectActiveTask.elapsedSeconds
// TODO: totalSecondsOfSelectedTab:
// if active task is in the tab -> sum elapsedSeconds

const SubSection = ({
  totalSeconds,
  selectedTabName,
  totalSecondsOfSelectedTab,
}: SubSectionProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const { mutate: endWorkSession } = useEndWorkSession();

  const handleEndWorkSession = async () => {
    // TODO: call API
    // TODO: end working session

    // TODO: get user id
    // TODO: get work session id
    // TODO: need an API that returns logged in user
    const userId = 1;
    const workSessionId = 1;
    await endWorkSession(
      { userId, workSessionId },
      {
        onError: () => {},
        onSuccess: () => {},
      },
    );
  };

  // TODO: LoadingOverlay
  return (
    <ContainerDiv colorThemeName={currentColorTheme}>
      <SectionDiv>
        <SectionTitleWrapperDiv>
          <SectionTitleP>Total Time</SectionTitleP>
        </SectionTitleWrapperDiv>
        <ElapsedTimeP>{secondsToHHMMSS(totalSeconds)}</ElapsedTimeP>
      </SectionDiv>

      <SectionDiv>
        <SectionTitleWrapperDiv>
          <SectionTitleP>{`${selectedTabName} Total Time`}</SectionTitleP>
        </SectionTitleWrapperDiv>
        <ElapsedTimeP>
          {secondsToHHMMSS(totalSecondsOfSelectedTab)}
        </ElapsedTimeP>
      </SectionDiv>

      <ButtonCustom
        color={coralRed}
        borderColor={coralRed}
        backgroundColor={coralRed}
        onClick={handleEndWorkSession}
      >
        <ButtonTextP>End this session</ButtonTextP>
      </ButtonCustom>
    </ContainerDiv>
  );
};

export default SubSection;
