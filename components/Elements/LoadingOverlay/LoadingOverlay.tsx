import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

import Overlay from './Overlay';
import Loader from './Loader';

import { vegetation } from '../../../const/styles/colors';

/**
 * Loading overlay and loader
 *
 * @param {LoaderSizeMarginProps} props
 * @return {*} JSX.Element
 */
const LoadingOverlay = (props: LoaderSizeMarginProps) => {
  const { loading, color = vegetation } = props;

  return (
    <Overlay isLoading={loading}>
      <Loader {...props} color={color} />
    </Overlay>
  );
};

export default LoadingOverlay;
