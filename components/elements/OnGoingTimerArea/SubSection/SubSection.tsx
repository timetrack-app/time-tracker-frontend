import styled from 'styled-components';

import Button from '../../common/Button/Button';
import { useModal } from '../../common/Modal/Modal';
import EndWorkSessionConfirmModal from './EndWorkSessionConfirmModal';

import { useEndWorkSession } from '../../../../features/workSession/api/hooks/useEndWorkSession';

import { useAppDispatch, useAppSelector } from '../../../../stores/hooks';
import { updateIsWorkSessionActive } from '../../../../stores/slices/workSessionSlice';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

import { ColorThemeName } from '../../../../types/colorTheme';

import { secondsToHHMMSS } from '../../../../utils/timer';
import { white, coralRed, roseMadder, tartanRed, gray90 } from '../../../../const/styles/colors';

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

const ButtonCustom = styled(Button)`
  padding: 0.5em 1em;
  color: ${white};

  &:hover {
    color: ${gray90};
    background-color: ${roseMadder};
    border: 1px solid ${roseMadder};
  }

  &:active {
    color: ${gray90};
    background-color: ${tartanRed};
    border: 1px solid ${tartanRed};
  }
`;

const ButtonTextP = styled.p`
  display: block;
  font-weight: 500;
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
  const dispatch = useAppDispatch();

  const currentColorTheme = useAppSelector(selectColorTheme);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { mutate: endWorkSession } = useEndWorkSession();

  const handleEndSessionOnClick = () => {
    openModal();
  };

  const handleEndWorkSession = async () => {
    // TODO: get user id
    // TODO: get work session id
    // TODO: need an API that returns logged in user
    const userId = 1;
    const workSessionId = 1;
    await endWorkSession(
      { userId, workSessionId },
      {
        onError: () => {},
        onSuccess: () => {
          dispatch(updateIsWorkSessionActive(false));
        },
      },
    );
  };

  // TODO: LoadingOverlay
  return (
    <>
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
          onClick={handleEndSessionOnClick}
        >
          <ButtonTextP>End this session</ButtonTextP>
        </ButtonCustom>
      </ContainerDiv>
      <EndWorkSessionConfirmModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleYesButtonOnClick={handleEndWorkSession}
      />
    </>
  );
};

export default SubSection;
