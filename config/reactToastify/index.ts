import { ToastOptions, Slide } from 'react-toastify';

export const defaultToastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Slide,
};
