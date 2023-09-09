import { ColorThemeStyle } from '../../types/colorTheme';

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
  },
};
