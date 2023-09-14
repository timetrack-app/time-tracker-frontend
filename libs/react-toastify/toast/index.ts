import { toast, ToastContent, ToastOptions } from 'react-toastify';

import { defaultToastOption } from '../../../config/reactToastify';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {*}
 */
export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: ToastOptions = defaultToastOption,
) => {
  switch (type) {
    case 'success':
      return toast.success(content, options);
    case 'error':
      return toast.error(content, options);
    case 'info':
      return toast.info(content, options);
    case 'warning':
      return toast.warn(content, options);
    case 'default':
      return toast(content, options);
    default:
      return toast(content, options);
  }
};
