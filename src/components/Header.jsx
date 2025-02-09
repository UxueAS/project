import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import BurgerMenu from './BurgerMenu'
import { MdOutlinePerson, MdPerson, MdFavoriteBorder, MdOutlineShoppingCart, MdClose } from "react-icons/md";
import AuthService from '../services/auth';
import { useCartContext } from "../providers/CartProvider";
import { useProductsContext } from '../providers/ProductsProvider';
import { useState } from 'react';


const Header = () => {
  const navigate = useNavigate();
  const { resetCart, getTotalItems } = useCartContext();
  const { products } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const logout = () => {
    AuthService.logout();
    resetCart();
    navigate('/');
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  return (
   <header className="h-24 border-b border-b-dark-grey">
      <nav className='h-full flex align-middle'>
        <BurgerMenu />
        <Link to="/" className="mr-4 flex flex-col justify-end pb-4"><img src={logo} alt="NAIZ" className='h-10' /></Link>
        <div className='ml-auto flex items-end gap-2 mb-4 mr-6'>
          <div className='hidden md:block'>
            <input type="text"
              name='search'
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={openSearch}
              className='rounded-full px-6 py-1 border border-gray-400' placeholder='Buscar en NAIZ'/>
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
      {isSearchOpen && searchTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start mt-24 z-20">
          <div className="bg-white w-screen shadow-lg p-4 relative">
            <div className='mx-auto max-w-6xl w-full flex flex-col'>
              <button
                onClick={clearSearch}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                <MdClose />
              </button>
              <h2 className="text-lg font-semibold mb-4">Resultados de la búsqueda</h2>
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 border-b last:border-none hover:bg-gray-100 cursor-pointer"
                    >
                      <Link onClick={clearSearch} to={`/productos/${product.id}`}>{product.title} - {product.price}€</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No se ha encontrado ningún resultado.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    
  );
};

export default Header;