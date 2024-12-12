import {useState, useEffect} from 'react';
import images from '../assets/images';
import { Link } from 'react-router-dom';

const Novedades = () => {
  const [novedades, setNovedades] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/c/ba4f-47e4-4ceb-8beb')
      .then(response => response.json())
      .then(data => setNovedades(data));
  }, []);
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold mb-8'>Novedades</h2>
        <div className='grid grid-cols-4 gap-6 mb-10'>
          {novedades.map(product => (
            <div key={product.id} className='flex flex-col'>
              <img src={images[product.img]} alt={product.title} className='w-full aspect-square' />
              <Link to={`/product/${product.id}`}>
                <h3 className='font-semibold text-2xl'>{product.title}</h3>
              </Link>
              <p className='text-lg'>{product.text}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Novedades;