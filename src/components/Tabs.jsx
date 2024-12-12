import {useState, useEffect} from 'react';
import images from '../assets/images';
import { Link } from 'react-router-dom';
import TabCard from './TabCard';

const Tabs = () => {
  const [ofertas, setOfertas] = useState([]);
  const [sorteos, setSorteos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tab, setTab] = useState('ofertas');
  useEffect(() => {
    fetch('https://dummyjson.com/c/ba4f-47e4-4ceb-8beb')
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);
  return (
    <div>
      <div className='flex justify-center gap-40 border-b mb-10 font-semibold text-3xl'>
        <button onClick={() => setTab('ofertas')} className={`px-8 py-2 ${tab === 'ofertas' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Ofertas</button>
        <button onClick={() => setTab('sorteos')} className={`px-4 py-2 ${tab === 'sorteos' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Sorteos</button>
        <button onClick={() => setTab('productos')} className={`px-4 py-2 ${tab === 'productos' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Productos</button>
      </div>
      {tab === 'ofertas' && 
        <div className='grid grid-cols-4 gap-6 mb-10'>
        {ofertas.map(product => (
          <TabCard key={product.id} product={product} />
        ))}
        </div>
      }
      
      {tab === 'sorteos' && 
        <div className='grid grid-cols-4 gap-6 mb-10'>
        {sorteos.map(product => (
          <TabCard key={product.id} product={product} />
        ))}
        </div>
      }
      
      {tab === 'productos' && 
        <div className='grid grid-cols-4 gap-6 mb-10'>
        {productos.map(product => (
          <TabCard key={product.id} product={product} />
        ))}
        </div>
      }
    </div>
  );
};

export default Tabs;