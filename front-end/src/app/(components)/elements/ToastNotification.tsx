import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useRef } from 'react';

interface MyComponentProps {
  type?: string; 
  content?: string;
  width?: string;
}

const ToastNotification : React.FC<MyComponentProps> = ({type , content, width}) => {
  // Référence pour éviter les affichages multiples
  const toastDisplayed = useRef(false);
  
  useEffect(() => {
    // Seulement afficher la notification si elle n'a pas déjà été affichée
    if (type && content && !toastDisplayed.current) {
      toastDisplayed.current = true;
      
      switch(type) {
        case 'success':
          toast.success(content, {
            theme: "colored",
            style: { background: '#8cb369', color: '#F2F9FE', width: width || '25rem' }
          });
          break;
        case 'error':
          toast.error(content, {
            style: { color: "#e07a5f", width: width || '25rem' },
            theme: 'dark'
          });
          break;
        case 'info':
          toast.info(content, {
            theme: "colored",
            style: { background: "#5BC0DE", color: "#F2F9FE", width: width || '25rem' }
          });
          break;
        case 'warning':
          toast.warning(content, {
            theme: "colored",
            style: { background: "#F0AD4E", color: "#F2F9FE", width: width || '25rem' }
          });
          break;
        default:
          break;
      }
    }
    
    // Réinitialiser le suivi pour permettre d'afficher une nouvelle notification si les props changent
    return () => {
      toastDisplayed.current = false;
    };
  }, [type, content, width]);

  return (
    <ToastContainer />
  );
};

export default ToastNotification;
