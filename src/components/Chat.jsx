import { FaWhatsapp } from 'react-icons/fa';

const Chat = () => {
  return (
    <a 
      href="https://wa.me/634401373" 
      className="bg-primary text-dark-grey p-3 rounded-full fixed bottom-6 right-6" 
      target="_blank" 
      title="Chatea con nosotros por Whatsapp"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={25} />
    </a>
  );
};

export default Chat;