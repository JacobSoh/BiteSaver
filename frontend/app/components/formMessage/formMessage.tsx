import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './formMessage.module.css'

interface FormMessageProps {
  message: string
  status: 'success' | 'error' | 'neutral' | ''
}

const FormMessage: React.FC<FormMessageProps> = ({ message, status }) => {
    React.useEffect(() => {
      const toastId = 'formMessageToast';
  
      if (status === 'success') {
        toast.success(message, { toastId });
      } else if (status === 'error') {
        toast.error(message, { toastId });
      } else if (status === 'neutral') {
        toast.info(message, { toastId });
      }
    }, [message, status]);
  
    return (
      <ToastContainer
        className={styles.toast}
        position="top-right"
        hideProgressBar={false}
        autoClose={3000}
        pauseOnHover={false}
        closeButton={false}
      />
    );
  };
  
export default FormMessage
