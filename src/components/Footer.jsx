import LogoTxuri from "../assets/logo_txuri.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark-grey text-white p-8">
      <div className="flex flex-col lg:flex-row text-center lg:text-left gap-4 lg:gap-48 mx-12 text-2xl font-semibold mb-8">
        <div>
          <img src={LogoTxuri} alt="NAIZ" className="h-10 lg:h-8 mx-auto"/>
        </div>
        <div>
          <Link to="/sorteos" className="hover:underline">Sorteos</Link>
        </div>
        <div>
          <Link to="/promociones" className="hover:underline">Promociones</Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <Link to="/productos/todos" className="hover:underline">Productos</Link>
        </div>
      </div>
      <div className="w-full text-center">
        &copy; 2024 NAIZ
      </div>
    </footer>
  );
};

export default Footer;