import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

import Overlay from './Overlay';
import Loader from './Loader';

/**
 * Loading overlay and loader
 *
 * @param {LoaderSizeMarginProps} props
 * @return {*} JSX.Element
 */
const LoadingOverlay = (props: LoaderSizeMarginProps) => {
  const { loading } = props;

  return (
    <Overlay isLoading={loading}>
      <Loader {...props} />
    </Overlay>
  );
};

export default LoadingOverlay;
