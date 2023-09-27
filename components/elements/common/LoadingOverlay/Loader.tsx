import { BeatLoader } from 'react-spinners';
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

/**
 * Loading spinner
 *
 * @param {LoaderSizeMarginProps} props
 */
const Loader = (props: LoaderSizeMarginProps) => (<BeatLoader {...props} />);

export default Loader;
