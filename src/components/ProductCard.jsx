import images from '../assets/images';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product, color }) => {
  return (
    <div key={product.id} className='flex flex-col'>
      <div className='w-full h-52 overflow-hidden mb-2'>
        <img src={images[product.img]} alt={product.title} />
      </div>
      <h3 className='font-semibold text-2xl mb-2'>{product.title}</h3>
      <p className='line-clamp-2 leading-4 mb-4'>{product.text}</p>
      <Link to={`/product/${product.id}`} className={`text-white font-light uppercase text-center py-2 ${color}`}>Comprar</Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
};

export default ProductCard;