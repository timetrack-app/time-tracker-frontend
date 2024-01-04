import styled from 'styled-components';
import Button, { ButtonProps } from './Button';
import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

import {
  mintFlash,
  softPetals,
  vegetation,
  mingGreen,
  exquisiteEmerald,
} from '../../../../const/styles/colors';
import { ColorThemeName } from '../../../../types/colorTheme';

const StyledButton = styled(Button)<{ colorThemeName: ColorThemeName }>`
  &:hover {
    background-color: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return mintFlash;
        case 'dark':
          return mingGreen;
        default:
          return mintFlash;
      }
    }};
  }

  &:active {
    box-shadow: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return `0 0 0 1px ${vegetation} inset`;
        case 'dark':
          return `0 0 0 1px ${exquisiteEmerald} inset`; // Adjust this for the dark theme's box-shadow color
        default:
          return `0 0 0 1px ${vegetation} inset`;
      }
    }};
    background-color: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return mintFlash;
        case 'dark':
          return '#288a60';
        default:
          return mintFlash;
      }
    }};
    border-color: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return mintFlash;
        case 'dark':
          return '#288a60';
        default:
          return mintFlash;
      }
    }};
  }
`;

const ButtonPrimary = (props: ButtonProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const colorThemes: {
    [key in ColorThemeName]: {
      color: string;
      backgroundColor: string;
      borderColor: string;
    };
  } = {
    light: {
      color: vegetation,
      backgroundColor: softPetals,
      borderColor: vegetation,
    },
    dark: {
      color: softPetals,
      backgroundColor: vegetation,
      borderColor: vegetation,
    },
  };

  const colorsToApply = colorThemes[currentColorTheme];

  return (
    <StyledButton
      colorThemeName={currentColorTheme}
      color={colorsToApply.color}
      backgroundColor={colorsToApply.backgroundColor}
      borderColor={colorsToApply.borderColor}
      {...props}
    />
  );
};

export default ButtonPrimary;
