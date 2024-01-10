import styled from 'styled-components';
import Button, { ButtonProps } from './Button';
import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

import {
  stonewallGrey,
  dryadBark,
  astrograniteDebris,
} from '../../../../const/styles/colors';
import { ColorThemeName } from '../../../../types/colorTheme';

const StyledButton = styled(Button)<{ colorThemeName: ColorThemeName }>`
  &:hover {
    background-color: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return stonewallGrey;
        case 'dark':
          return stonewallGrey;
        default:
          return stonewallGrey;
      }
    }};
  }

  &:active {
    box-shadow: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return `0 0 0 1px ${stonewallGrey} inset`;
        case 'dark':
          return `0 0 0 1px ${stonewallGrey} inset`; // Adjust this for the dark theme's box-shadow color
        default:
          return `0 0 0 1px ${stonewallGrey} inset`;
      }
    }};
    background-color: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return stonewallGrey;
        case 'dark':
          return stonewallGrey;
        default:
          return stonewallGrey;
      }
    }};
    border-color: ${({ colorThemeName }) => {
      switch (colorThemeName) {
        case 'light':
          return stonewallGrey;
        case 'dark':
          return stonewallGrey;
        default:
          return stonewallGrey;
      }
    }};
  }
`;

const ButtonSecondary = (props: ButtonProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const colorThemes: {
    [key in ColorThemeName]: {
      color: string;
      backgroundColor: string;
      borderColor: string;
    };
  } = {
    light: {
      color: dryadBark,
      backgroundColor: stonewallGrey,
      borderColor: dryadBark,
    },
    dark: {
      color: dryadBark,
      backgroundColor: stonewallGrey,
      borderColor: astrograniteDebris,
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

export default ButtonSecondary;
