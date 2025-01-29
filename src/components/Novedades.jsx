import {useState, useEffect} from 'react';
import images from '../assets/images';
import { Link } from 'react-router-dom';
import { getNovedades } from '../services/api';

const Novedades = () => {
  const [novedades, setNovedades] = useState([]);
  useEffect(() => {
    getNovedades().then(data => setNovedades(data));
  }, []);
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold mb-8'>Novedades</h2>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10'>
          {novedades.map(product => (
            <div key={product.id} className='flex flex-col'>
              <img src={images[product.img]} alt={product.title} className='w-full aspect-square' />
              <Link to={ product.type == 'producto' ? `/productos/${product.id}` : `/sorteos/${product.id}`}>  
                <h3 className='font-semibold text-2xl w-full break-words'>{product.title}</h3>
              </Link>
              <p className='text-lg'>{product.text}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Novedades;