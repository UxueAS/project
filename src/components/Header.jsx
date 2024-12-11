import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import BurgerMenu from './BurgerMenu'
import { MdOutlinePerson, MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
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
            <Link to="/login"><MdOutlinePerson/><span className='sr-only'>Iniciar Sesión</span></Link>
            <Link to="/favoritos"><MdFavoriteBorder/><span className='sr-only'>Favoritos</span></Link>
            <Link to="/carrito"><MdOutlineShoppingCart/><span className='sr-only'>Carrito</span></Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;