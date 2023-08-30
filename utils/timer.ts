/**
 * Format seconds to HH:mm:ss
 *
 * @param {number} seconds
 * @return {*}  {string}
 */
export const secondsToHHMMSS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const toStr0Pad = (time: number) => (
    time.toString().padStart(2, '0')
  );

  return `${toStr0Pad(hours)}:${toStr0Pad(minutes)}:${toStr0Pad(remainingSeconds)}`;
};
