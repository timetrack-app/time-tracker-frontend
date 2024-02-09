import { useUpdateActiveTaskTimer } from '../../../features/workSession/hooks';

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
