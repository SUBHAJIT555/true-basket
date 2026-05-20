import { ToastContainer as ReactToastContainer, toast } from 'react-toastify';
import theme from '@/theme';

export const notifySuccess = (message) => {
  if (typeof window === "undefined") return;
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const notifyError = (message) => {
  if (typeof window === "undefined") return;
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const ToastContainer = () => {
  return (
    <ReactToastContainer
      className={theme.toastClass}
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      toastClassName={`${theme.toastClass}-item`}
      bodyClassName={`${theme.toastClass}-body`}
      progressClassName={`${theme.toastClass}-progress`}
    />
  );
};
