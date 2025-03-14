import { ToastContainer, toast } from 'react-toastify';

const ToastNotification = ({type}) => {
    
  console.log(type)
    switch(type) {
      case 'success':
        toast.success("Nous vous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre adresse e-mail.", {
          theme: "colored",
          style: { background: '#8cb369', color: '#F2F9FE', width: '25rem' }
        });
        break;
      case 'error':
        toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.", {
            style: { color: "#e07a5f", width : "45rem" },
            theme: 'dark'
        });
        break;
      case 'info':
        toast.info("Voici une notification d'information.", {
          theme: "colored",
          style: { background: "#5BC0DE", color: "#F2F9FE", width: "45rem" }
        });
        break;
      case 'warning':
        toast.warning("Attention, quelque chose ne va pas.", {
          theme: "colored",
          style: { background: "#F0AD4E", color: "#F2F9FE", width: "45rem" }
        });
        break;
      default:
        toast("C'est une notification générale.", {
          theme: "colored",
          style: { background: "#6C757D", color: "#F2F9FE", width: "45rem" }
        });
    }

  return (
      <ToastContainer />
  );
};

export default ToastNotification;
