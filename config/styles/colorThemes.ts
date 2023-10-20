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
  whiteSmoke,
  carbon,
} from '../../const/styles/colors';

export const defaultColorThemeName: ColorThemeName = 'light';

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
    overlay: whiteSmoke,
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
    overlay: carbon,
  },
};

export const themeNameStyleMap: { [key in ColorThemeName]: ColorThemeStyle } = {
  light: lightTheme,
  dark: darkTheme,
};

export const defaultColorThemeStyle = themeNameStyleMap[defaultColorThemeName];
