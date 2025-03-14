import { ToastContainer, toast } from 'react-toastify';

interface MyComponentProps {
  type?: string; 
  content?: string;
  width?: string;
}

const ToastNotification : React.FC<MyComponentProps> = ({type , content, width}) => {
    console.log('width', width)
    switch(type) {
      case 'success':
        // toast.success("Nous vous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre adresse e-mail.", {
        toast.success(content, {
          theme: "colored",
          style: { background: '#8cb369', color: '#F2F9FE', width:  width || '25rem' }
        });
        break;
      case 'error':
        toast.error(content, {
            style: { color: "#e07a5f", width:  width || '25rem' },
            theme: 'dark'
        });
        break;
      case 'info':
        toast.info("Voici une notification d'information.", {
          theme: "colored",
          style: { background: "#5BC0DE", color: "#F2F9FE", width:  width || '25rem' }
        });
        break;
      case 'warning':
        toast.warning("Attention, quelque chose ne va pas.", {
          theme: "colored",
          style: { background: "#F0AD4E", color: "#F2F9FE", width:  width || '25rem' }
        });
        break;
      default:
        null
    }

  return (
      <ToastContainer />
  );
};

export default ToastNotification;
