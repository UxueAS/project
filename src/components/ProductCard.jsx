import images from '../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFavoritesContext } from '../providers/FavoritesProvider';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useCartContext } from '../providers/CartProvider';
import MessageAlert from './MessageAlert';
import { useState } from 'react';

const ProductCard = ({ product, color, btnText, element }) => {
  const token = localStorage.getItem('token');
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  const { addToCart, message } = useCartContext();
  const [showSorteoModal, setShowSorteoModal] = useState(false);
  const [sorteoMessage, setSorteoMessage] = useState(null);
  const navigate = useNavigate();
  const handleConfirmar = () => {
    setShowSorteoModal(false);
    setSorteoMessage('¡Gracias por participar en el sorteo!');
    setTimeout(() => setSorteoMessage(null), 3000);
  };

  return (
    <div key={product.id} className='w-full flex flex-col'>
      <MessageAlert message={message} />
      <MessageAlert message={sorteoMessage} />
      <Link className='group' to={`/${element}/${product.id}`}>
        <div className='w-full h-52 overflow-hidden mb-2 relative'>
          <img src={images[product.img]} alt={product.title} className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300' />
          { product.stock == 0 ? <span className='bg-red-500 text-white text-center py-1 px-2 text-xs absolute top-2 right-2 rounded-full'>Agotado</span> : null }
          { product.tag ? <span className='bg-primary text-white uppercase text-center py-1 px-2 text-xs absolute top-2 right-2 rounded-full'>{product.tag}</span> : null }
        </div>
        <h3 className='font-semibold text-2xl mb-2 line-clamp-2'>{product.title}</h3>
        <div className='flex gap-2'>
        <p className='line-clamp-2 leading-4 mb-4 grow'>{product.text}</p>
        {product.discount ? 
          <span className='text-primary'>{product.discount}€</span>
          : product.price ? <span className=''>{product.price}€</span> : null
        }
        
        </div>
      </Link>
      <div className='w-full flex grow items-end'>
        {element === 'productos' ?
          <button onClick={() => addToCart(product, 1)} className={`grow text-white font-light uppercase text-center py-2 mr-1 ${color}`}>{btnText}</button>
        : <><button 
            onClick={ token ? 
              () => {setShowSorteoModal(true);}
              : () => navigate('/login')
            }
            className={`grow text-white font-light uppercase text-center py-2 mr-1 ${color}`}>{btnText}</button>
            {showSorteoModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white text-dark-grey text-center rounded p-6 shadow-lg w-11/12 max-w-xl">
                  <h2 className="text-xl font-bold mb-4">Condiciones del Sorteo</h2>
                  <p className="mb-6">
                    Al participar en este sorteo, aceptas los términos y condiciones. 
                    Por favor, confirma para continuar.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleConfirmar}
                      className="px-4 py-2 bg-primary text-white font-semibold  uppercase hover:bg-primary/75 transition"
                    >
                      Confirmar Participación
                    </button>
                    <button
                      onClick={() => setShowSorteoModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        }
        <button
          onClick={ token ? 
            () => isFavorite(product.id)
              ? removeFromFavorites(product.id)
              : addToFavorites(product)
            : () => navigate('/login')
          }
          className={`p-1 mb-2 text-lg ${
            isFavorite(product.id) ? 'text-primary' : 'hover:text-primary '
          }`}
        >
          {isFavorite(product.id) ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    stock: PropTypes.number,
    tag: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number
  }).isRequired,
  color: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired
};

export default ProductCard;