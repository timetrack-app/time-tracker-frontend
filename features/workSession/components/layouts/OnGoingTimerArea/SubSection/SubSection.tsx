import styled from 'styled-components';

import Button from '../../../../../../components/elements/common/Button/Button';

import { useAppSelector } from '../../../../../../stores/hooks';

import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';

import { ColorThemeName } from '../../../../../../types/colorTheme';

import { secondsToHHMMSS } from '../../../../../../utils/timer';
import {
  white,
  coralRed,
  roseMadder,
  tartanRed,
  gray90,
} from '../../../../../../const/styles/colors';
import { breakPoint } from '../../../../../../const/styles/breakPoint';
import { selectCurrentSelectedTab } from '../../../../../../stores/slices/selectedTabSlice';

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  display: none;

  @media ${breakPoint.tablet} {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
    border-radius: 8px;
    padding: 2em;
    background-color: ${({ theme }) => theme.colors.componentBackground};
  }
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
  border-radius: 8px;
`;

const SectionTitleP = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TotalTimeP = styled.p`
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
  totalSecondsOfSelectedTab: number;
  onOpenEndWorkSessionConfirmModal: () => void;
};

// TODO: totalSeconds:
//  sum of total_time of all tasks(from the latest work session) + selectActiveTask.totalTime
// TODO: totalSecondsOfSelectedTab:
// if active task is in the tab -> sum totalTime

const SubSection = ({
  totalSeconds,
  // selectedTabName,
  totalSecondsOfSelectedTab,
  onOpenEndWorkSessionConfirmModal,
}: SubSectionProps) => {
  // const dispatch = useAppDispatch();

  const { name: selectedTabName } = useAppSelector(selectCurrentSelectedTab);
  // const { workSessionId } = useAppSelector(selectWorkSessionState);
  const currentColorTheme = useAppSelector(selectColorTheme);

  // TODO: LoadingOverlay
  return (
    <>
      <ContainerDiv colorThemeName={currentColorTheme}>
        <SectionDiv>
          <SectionTitleWrapperDiv>
            <SectionTitleP>Total Time</SectionTitleP>
          </SectionTitleWrapperDiv>
          <TotalTimeP>{secondsToHHMMSS(totalSeconds)}</TotalTimeP>
        </SectionDiv>

        <SectionDiv>
          <SectionTitleWrapperDiv>
            <SectionTitleP>{`${selectedTabName} Total Time`}</SectionTitleP>
          </SectionTitleWrapperDiv>
          <TotalTimeP>{secondsToHHMMSS(totalSecondsOfSelectedTab)}</TotalTimeP>
        </SectionDiv>

        <ButtonCustom
          color={coralRed}
          borderColor={coralRed}
          backgroundColor={coralRed}
          onClick={onOpenEndWorkSessionConfirmModal}
        >
          <ButtonTextP>End this session</ButtonTextP>
        </ButtonCustom>
      </ContainerDiv>
    </>
  );
};

export default SubSection;
