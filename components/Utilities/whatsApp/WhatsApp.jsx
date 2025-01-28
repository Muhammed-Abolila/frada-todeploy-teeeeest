import "./WhatsApp.css";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  return (
    <div className="whats-icon">
      <a href="https://wa.me/+966557665585" target="_blank">
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default WhatsApp;
