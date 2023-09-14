import { ToastOptions, Slide } from 'react-toastify';

export const defaultToastOption: ToastOptions = {
  position: 'top-center',
  autoClose: 8000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Slide,
};
