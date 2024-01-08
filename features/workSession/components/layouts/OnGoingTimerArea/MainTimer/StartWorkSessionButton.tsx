import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';
import { updateIsWorkSessionActive } from '../../../../../../stores/slices/workSessionSlice';

import { vegetation, viridian } from '../../../../../../const/styles/colors';
import { baseStyle } from '../Timer/Layout';

import { ColorThemeName } from '../../../../../../types/colorTheme';

const Button = styled.button<{ colorThemeName: ColorThemeName }>`
  ${baseStyle}

  appearance: none;
  color: ${vegetation};
  border: 2.5px solid ${vegetation};
  cursor: pointer;
  transition: border-width 0.1s ease-in-out;

  &:hover {
    border: 5px solid ${vegetation};
  }

  &:active {
    color: ${viridian};
    border: 5px solid ${viridian};
  }
`;

const LabelP = styled.p`
  font-size: 1.8em;
  font-weight: 600;
`;

type Props = {
  className?: string;
  onClick: () => void;
};

/**
 * Click and create a new work session
 *
 * @param {Props} { className }
 * @return {JSX.Element}
 */
const StartWorkSessionButton = ({ className, onClick }: Props) => {
  const dispatch = useAppDispatch();
  const currentColorThemeName = useAppSelector(selectColorTheme);

  // const startWorkSession = () => {
  //   // TODO: Call start work session API

  //   dispatch(updateIsWorkSessionActive(true));
  // };

  return (
    <Button
      type="button"
      colorThemeName={currentColorThemeName}
      onClick={onClick}
      className={className}
    >
      <LabelP>START SESSION</LabelP>
    </Button>
  );
};

export default StartWorkSessionButton;
