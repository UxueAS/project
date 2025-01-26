import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TabCard from './TabCard';
import { getProducts, getPromociones, getSorteos } from '../services/api';

const Tabs = () => {
  const [promociones, setPromociones] = useState([]);
  const [sorteos, setSorteos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tab, setTab] = useState('promociones');
  useEffect(() => {
    getProducts.then(data => setProductos(data.splice(0,4)));
    getSorteos.then(data => setSorteos(data.splice(0,4)))
        .catch(error => console.error("Error fetching sorteos:", error));
    getPromociones.then(data => setPromociones(data.splice(0,4)))
        .catch(error => console.error("Error fetching promociones:", error));
  }, []);
  return (
    <div>
      <div className='flex justify-center gap-40 border-b mb-10 font-semibold text-3xl'>
        <button onClick={() => setTab('promociones')} className={`px-8 py-2 ${tab === 'promociones' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Promociones</button>
        <button onClick={() => setTab('sorteos')} className={`px-4 py-2 ${tab === 'sorteos' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Sorteos</button>
        <button onClick={() => setTab('productos')} className={`px-4 py-2 ${tab === 'productos' ? 'text-primary border-b-2 border-b-primary' : 'text-black'}`}>Productos</button>
      </div>
      {tab === 'promociones' && 
        <div className='mb-6 flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-6 mb-10'>
          {promociones.map(product => (
            <TabCard key={product.id} product={product} type="promociones" />
          ))}
          </div>
          <Link to="/promociones" className="bg-primary py-1 uppercase font-light text-lg px-8">Ver todas las promociones</Link>
        </div>
      }
      
      {tab === 'sorteos' && 
        <div className='mb-6 flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-6 mb-10'>
          {sorteos.map(product => (
            <TabCard key={product.id} product={product} type="sorteos" />
          ))}
          </div>
          <Link to="/sorteos" className="bg-primary py-1 uppercase font-light text-lg px-8">Ver todos los sorteos</Link>
        </div>
      }
      
      {tab === 'productos' && 
        <div className='mb-6 flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-6 mb-10'>
          {productos.map(product => (
            <TabCard key={product.id} product={product} type="productos" />
          ))}
          </div>
          <Link to="/productos/todos" className="bg-primary py-1 uppercase font-light text-lg px-8">Ver todos los productos</Link>
        </div>
      }
    </div>
  );
};

export default Tabs;