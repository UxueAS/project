import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import BurgerMenu from './BurgerMenu'
import { MdOutlinePerson, MdPerson, MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import AuthService from '../services/auth';
import { useCartContext } from "../providers/CartProvider";


const Header = () => {
  const navigate = useNavigate();
  const { resetCart, getTotalItems } = useCartContext();
  const logout = () => {
    AuthService.logout();
    resetCart();
    navigate('/');
  }
  return (
   <header className="h-24 border-b border-b-dark-grey">
      <nav className='h-full flex align-middle'>
        <BurgerMenu />
        <Link to="/" className="mr-4 flex flex-col justify-end pb-4"><img src={logo} alt="NAIZ" className='h-10' /></Link>
        <div className='ml-auto flex items-end gap-2 mb-4 mr-6'>
          <div>
            <input type="text" name='search' className='rounded-full px-6 py-1 border border-gray-400' placeholder='Buscar en NAIZ'/>
          </div>
          <div className='flex gap-2 mb-2 text-primary text-2xl'>
            { AuthService.getToken() ? 
              <button onClick={logout} title="Cerrar Sesión"><MdPerson/><span className='sr-only'>Cerrar Sesión</span></button>
              : <Link to="/login"><MdOutlinePerson/><span className='sr-only'>Iniciar Sesión</span></Link>
            }
            <Link to="/favoritos"><MdFavoriteBorder/><span className='sr-only'>Favoritos</span></Link>
            <Link to="/carrito" className='relative'>
              <MdOutlineShoppingCart/>
              <span className='sr-only'>Carrito</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;