import { colorThemeNames } from '../const/colorTheme';

export type ColorThemeStyle = {
  colors: {
    text: string
    background: string
    componentBackground: string
    border: string
    info: string
    infoBg: string
    danger: string
    dangerBg: string
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
