import { useCallback, useEffect, useState } from 'react'
import { sizePxNum } from '../const/styles/breakPoint'

/**
 * Detect window resize and returns if the window size is below the breakpoint px or not
 *
 * @param {number} [breakPoint=sizePxNum.tablet]
 * @return {readonly [boolean, Dispatch<SetStateAction<boolean>>]}
 */
export const useWindowResize = (breakPoint = sizePxNum.tablet) => {
  const isInBrowser = typeof window !== undefined;
  const [isBelowBreakPoint, setIsBelowBreakPoint] = useState<boolean>(false);

  // state update when the screen is resized
  const resizeEvent = useCallback(() => {
    window.addEventListener('resize', () => {
      window.innerWidth <= breakPoint
        ? setIsBelowBreakPoint(true)
        : setIsBelowBreakPoint(false);
    });
  },[isBelowBreakPoint]);

  useEffect(() => {
    if (isInBrowser) {
      if (window.innerWidth >= breakPoint) {
        setIsBelowBreakPoint(true);
      }
      resizeEvent();
      return () => window.removeEventListener('resize', resizeEvent);
    }

  }, [isInBrowser]);

  return [ isBelowBreakPoint, setIsBelowBreakPoint ] as const;
}
