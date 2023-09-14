import { defaultColorThemeName } from '../const/colorTheme';

import { getColorThemeCookie, setColorThemeCookie } from '../utils/cookie/colorTheme';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { selectColorTheme, updateColorTheme } from '../stores/slices/colorThemeSlice';

import { themeNameStyleMap } from '../config/styles/colorThemes';

import { ColorThemeName, ColorThemeStyle, isColorThemeName } from '../types/colorTheme';

/**
 * Custom hook for handling color themes
 *
 */
export const useColorTheme = () => {
  const dispatch = useAppDispatch();
  const currentColorTheme = useAppSelector(selectColorTheme);

  /**
   * Set color theme cookie and state
   *
   * @param {ColorThemeName} colorThemeName
   */
  const setColorTheme = (colorThemeName: ColorThemeName) => {
    setColorThemeCookie(colorThemeName);
    dispatch(updateColorTheme(colorThemeName));
  };

  /**
   * Initialize color theme cookie and state
   *
   * @return {void}
   */
  const initColorTheme = () => {
    const currentColorThemeCookie = getColorThemeCookie();

    if (!currentColorThemeCookie || !isColorThemeName(currentColorThemeCookie)) {
      setColorTheme(defaultColorThemeName);
      return;
    }

    dispatch(updateColorTheme(currentColorThemeCookie));
  };

  /**
   *
   *
   * @return {*}  {ColorThemeStyle}
   */
  const getCurrentColorThemeStyle = (): ColorThemeStyle => (
    themeNameStyleMap[currentColorTheme]
  );

  return {
    setColorTheme,
    initColorTheme,
    getCurrentColorThemeStyle,
  };
};
