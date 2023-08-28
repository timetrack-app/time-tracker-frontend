import { colorThemeNames } from '../config/colorTheme';

export type ColorThemeStyle = {
  colors: {
    text: string
    background: string
    componentBackground: string
    border: string
    info: string
    danger: string
  },
};

export type ColorThemeName = typeof colorThemeNames[number];

/**
 * Type guard for ColorThemeName
 *
 * @param {unknown} val
 * @return {*}  {val is ColorThemeName}
 */
export const isColorThemeName = (val: unknown): val is ColorThemeName => (
  colorThemeNames.includes(val as ColorThemeName)
);
