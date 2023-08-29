import { defaultColorThemeName } from '../config/colorTheme';

import { getColorThemeCookie, setColorThemeCookie } from '../services/cookie/colorTheme';

import { useAppDispatch } from '../stores/hooks';
import { updateColorTheme } from '../stores/slices/colorThemeSlice';

import { ColorThemeName, isColorThemeName } from '../types/colorTheme';

/**
 * Custom hook for handling color themes
 *
 */
const useColorTheme = () => {
  const dispatch = useAppDispatch();

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

  return {
    setColorTheme,
    initColorTheme,
  };
};

export default useColorTheme;
