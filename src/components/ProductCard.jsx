import images from '../assets/images';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product, color, btnText, element }) => {
  return (
    <div key={product.id} className='flex flex-col'>
      <div className='w-full h-52 overflow-hidden mb-2 relative'>
        <img src={images[product.img]} alt={product.title} />
        { product.stock == 0 ? <span className='bg-red-500 text-white text-center py-1 px-2 text-xs absolute top-2 right-2 rounded-full'>Agotado</span> : null }
      </div>
      <h3 className='font-semibold text-2xl mb-2'>{product.title}</h3>
      <p className='line-clamp-2 leading-4 mb-4'>{product.text}</p>
      <Link to={`/${element}/${product.id}`} className={`text-white font-light uppercase text-center py-2 ${color}`}>{btnText}</Link>
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