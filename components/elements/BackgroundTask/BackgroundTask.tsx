import { useUpdateActiveTaskTimer } from '../../../features/workSession';

/**
 *
 *
 * @return {null}
 */
const BackgroundTask = (): null => {
  // update active task timer
  useUpdateActiveTaskTimer();

  return null;
};

export default BackgroundTask;

