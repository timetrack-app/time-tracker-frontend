export const sizePxNum = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const sizePxStr = {
  mobileS: `${sizePxNum.mobileS}px`,
  mobileM: `${sizePxNum.mobileM}px`,
  mobileL: `${sizePxNum.mobileL}px`,
  tablet: `${sizePxNum.tablet}px`,
  laptop: `${sizePxNum.laptop}px`,
  laptopL: `${sizePxNum.laptopL}px`,
  desktop: `${sizePxNum.desktop}px`,
};

// Usage: @media ${breakPoint.mobileS} {...}
export const breakPoint = {
  mobileS: `(min-width: ${sizePxStr.mobileS})`,
  mobileM: `(min-width: ${sizePxStr.mobileM})`,
  mobileL: `(min-width: ${sizePxStr.mobileL})`,
  tablet: `(min-width: ${sizePxStr.tablet})`,
  laptop: `(min-width: ${sizePxStr.laptop})`,
  laptopL: `(min-width: ${sizePxStr.laptopL})`,
  desktop: `(min-width: ${sizePxStr.desktop})`,
  desktopL: `(min-width: ${sizePxStr.desktop})`,
};
