import images from '../assets/images';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFavoritesContext } from '../providers/FavoritesProvider';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const ProductCard = ({ product, color, btnText, element }) => {
  const token = localStorage.getItem('token');
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  return (
    <div key={product.id} className='flex flex-col'>
      <div className='w-full h-52 overflow-hidden mb-2 relative'>
        <img src={images[product.img]} alt={product.title} />
        { product.stock == 0 ? <span className='bg-red-500 text-white text-center py-1 px-2 text-xs absolute top-2 right-2 rounded-full'>Agotado</span> : null }
      </div>
      <h3 className='font-semibold text-2xl mb-2 line-clamp-2'>{product.title}</h3>
      <p className='line-clamp-2 leading-4 mb-4'>{product.text}</p>
      <div className='w-full flex grow items-end'>
        <Link to={`/${element}/${product.id}`} className={`grow text-white font-light uppercase text-center py-2 mr-1 ${color}`}>{btnText}</Link>
        <button
          onClick={ token ? 
            () => isFavorite(product.id)
              ? removeFromFavorites(product.id)
              : addToFavorites(product)
            : () => <Navigate to='/login' />
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
    stock: PropTypes.number
  }).isRequired,
  color: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired
};

export default ProductCard;