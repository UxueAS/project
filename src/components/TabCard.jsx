import PropTypes from 'prop-types';
import images from '../assets/images';
import { Link } from 'react-router-dom';

const TabCard = ({ product }) => {
  return (
    <div key={product.id} className='flex bg-slate-200'>
      <div className='w-1/2 h-full'>
        <img src={images[product.img]} alt={product.title} className='object-cover w-full h-full'/>
      </div>
      
      <div className='py-2 pl-4 pr-2 flex flex-col'>
        <h3 className='font-semibold text-xl mb-2'>{product.title}</h3>
        <Link to={`/product/${product.id}`} className='bg-dark-grey text-white font-light uppercase text-center py-1'>
          + Info
        </Link>
      </div>
    </div>
  );
};

TabCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default TabCard;