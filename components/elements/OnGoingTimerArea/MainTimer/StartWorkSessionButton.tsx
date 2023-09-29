import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';
import { updateStartStatus } from '../../../../stores/slices/workSessionSlice';

import { vegetation, viridian } from '../../../../const/styles/colors';
import { baseStyle } from './Layout';

import { ColorThemeName } from '../../../../types/colorTheme';

const Button = styled.button<{ colorThemeName: ColorThemeName }>`
  ${baseStyle}

  appearance: none;
  color: ${vegetation};
  border: 2.5px solid ${vegetation};
  cursor: pointer;

  &:hover {
    border: 4px solid ${vegetation};
  }

  &:active {
    color: ${viridian};
    border: 4px solid ${viridian};
  }
`;

const LabelP = styled.p`
  font-size: 1.8em;
  font-weight: 600;
`;

/**
 * Click and create a new work session
 *
 * @return { JSX.Element }
 */
const StartWorkSessionButton = () => {
  const dispatch = useAppDispatch();
  const currentColorThemeName = useAppSelector(selectColorTheme);

  const startWorkSession = () => {
    // TODO: Call start work session API
    dispatch(updateStartStatus(true));
  }

  return (
    <Button
      type="button"
      colorThemeName={currentColorThemeName}
      onClick={startWorkSession}
    >
      <LabelP>START SESSION</LabelP>
    </Button>
  );
};

export default StartWorkSessionButton;
