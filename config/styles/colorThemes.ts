import { ColorThemeStyle, ColorThemeName } from '../../types/colorTheme';

// colors
import {
  dryadBark,
  white,
  errigalWhite,
  gainsboro,
  coralRed,
  vegetation,
  astrograniteDebris,
  aswadBlack,
  washedBlack,
  softPetals,
  translucentUnicorn,
  overlay,
} from '../../const/styles/colors';

export const lightTheme: ColorThemeStyle = {
  colors: {
    text: dryadBark,
    background: errigalWhite,
    componentBackground: white,
    border: gainsboro,
    info: vegetation,
    infoBg: softPetals,
    danger: coralRed,
    dangerBg: translucentUnicorn,
    overlay: overlay,
  },
};

export const darkTheme: ColorThemeStyle = {
  colors: {
    text: white,
    background: aswadBlack,
    componentBackground: washedBlack,
    border: astrograniteDebris,
    info: vegetation,
    infoBg: softPetals,
    danger: coralRed,
    dangerBg: translucentUnicorn,
    overlay: overlay,
  },
};

export const themeNameStyleMap: { [key in ColorThemeName]: ColorThemeStyle } = {
  light: lightTheme,
  dark: darkTheme,
};

export const defaultColorThemeName: ColorThemeName = 'light';

export const defaultColorThemeStyle = themeNameStyleMap[defaultColorThemeName];
