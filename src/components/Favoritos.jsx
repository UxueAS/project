import {useState, useEffect} from 'react';
import images from '../assets/images';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../providers/FavoritesProvider';
import { getFavoritos } from '../services/api';

const Favoritos = () => {
  const [novedades, setNovedades] = useState([]);
  const { favorites } = useFavoritesContext();
  useEffect(() => {
    getFavoritos().then(data => setNovedades([...favorites, ...data]));
  }, [favorites]);
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold mb-8'>Mis productos favoritos</h2>
        <div className='grid grid-cols-4 gap-6 mb-10'>
          {novedades.sort(() => 0.5 - Math.random()).slice(0, 4).map(product => (
            <div key={product.id} className='flex flex-col'>
              <div className='w-full aspect-square'>
                <img src={images[product.img]} alt={product.title} className='object-cover w-full h-full' />
              </div>
              
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

export default Favoritos;